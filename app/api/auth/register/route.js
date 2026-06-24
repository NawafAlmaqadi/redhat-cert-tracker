import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('redhat-tracker');
    const users = db.collection('users');

    const existing = await users.findOne({ username: username.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Username already taken.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await users.insertOne({
      username: username.toLowerCase(),
      displayName: username,
      passwordHash,
      completedCerts: [],
      createdAt: new Date(),
    });

    const token = await signToken({ userId: result.insertedId.toString(), username: username.toLowerCase() });
    const response = NextResponse.json({ success: true, username: username.toLowerCase() }, { status: 201 });
    setAuthCookie(response, token);
    return response;
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
