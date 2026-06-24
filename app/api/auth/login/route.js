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

    const client = await clientPromise;
    const db = client.db('redhat-tracker');
    const users = db.collection('users');

    const user = await users.findOne({ username: username.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const token = await signToken({ userId: user._id.toString(), username: user.username });
    const response = NextResponse.json({ success: true, username: user.username }, { status: 200 });
    setAuthCookie(response, token);
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
