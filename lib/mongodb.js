import { MongoClient } from 'mongodb';

/**
 * Resolve MongoDB Atlas SRV records using Cloudflare DNS-over-HTTPS (port 443).
 * This bypasses the system DNS entirely, fixing networks that block SRV lookups.
 */
async function resolveAtlasUri(uri) {
  if (!uri?.startsWith('mongodb+srv://')) return uri;

  try {
    const url = new URL(uri);
    const host = url.hostname;

    // Fetch SRV + TXT records from Cloudflare DoH in parallel
    const [srvRes, txtRes] = await Promise.all([
      fetch(`https://cloudflare-dns.com/dns-query?name=_mongodb._tcp.${host}&type=SRV`,
        { headers: { Accept: 'application/dns-json' } }),
      fetch(`https://cloudflare-dns.com/dns-query?name=${host}&type=TXT`,
        { headers: { Accept: 'application/dns-json' } }),
    ]);

    const srv = await srvRes.json();
    const txt = await txtRes.json();

    if (!srv.Answer?.length) throw new Error('No SRV records returned from DoH');

    // Build host list from SRV answers
    const hosts = srv.Answer.map(({ data }) => {
      const parts = data.trim().split(/\s+/);
      const target = parts[3].replace(/\.$/, '');
      const port = parts[2];
      return `${target}:${port}`;
    }).join(',');

    // TXT record holds replicaSet + authSource options
    const txtOpts = txt.Answer?.[0]?.data?.replace(/"/g, '') ?? 'authSource=admin';

    // Preserve credentials and extra params (appName, etc.)
    const user = encodeURIComponent(decodeURIComponent(url.username));
    const pass = encodeURIComponent(decodeURIComponent(url.password));
    const creds = user ? `${user}:${pass}@` : '';
    const extra = url.searchParams.toString();

    const resolved = `mongodb://${creds}${hosts}${url.pathname}?${txtOpts}&ssl=true${extra ? '&' + extra : ''}`;
    console.log('[mongodb] DoH resolved — using direct connection');
    return resolved;
  } catch (err) {
    console.error('[mongodb] DoH resolution failed, falling back to original URI:', err.message);
    return uri;
  }
}

async function createClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Add MONGODB_URI to .env.local');
  const resolvedUri = await resolveAtlasUri(uri);
  const client = new MongoClient(resolvedUri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });
  return client.connect();
}

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClient();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClient();
}

export default clientPromise;
