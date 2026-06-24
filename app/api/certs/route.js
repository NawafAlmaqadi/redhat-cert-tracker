import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getAuthUser } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

// GET — fetch completed certs for the logged-in user
export async function GET() {
  const payload = await getAuthUser();
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  const db = client.db('redhat-tracker');
  const user = await db.collection('users').findOne(
    { _id: new ObjectId(payload.userId) },
    { projection: { completedCerts: 1 } }
  );

  return NextResponse.json({ completedCerts: user?.completedCerts || [] });
}

// POST — toggle a cert (add or remove from completedCerts)
export async function POST(request) {
  const payload = await getAuthUser();
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { code, completed } = await request.json();
  if (!code) return NextResponse.json({ error: 'code is required' }, { status: 400 });

  const client = await clientPromise;
  const db = client.db('redhat-tracker');
  const users = db.collection('users');

  if (completed) {
    await users.updateOne(
      { _id: new ObjectId(payload.userId) },
      { $addToSet: { completedCerts: code } }
    );
  } else {
    await users.updateOne(
      { _id: new ObjectId(payload.userId) },
      { $pull: { completedCerts: code } }
    );
  }

  return NextResponse.json({ success: true });
}

// DELETE — reset all certs
export async function DELETE() {
  const payload = await getAuthUser();
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  const db = client.db('redhat-tracker');
  await db.collection('users').updateOne(
    { _id: new ObjectId(payload.userId) },
    { $set: { completedCerts: [] } }
  );

  return NextResponse.json({ success: true });
}
