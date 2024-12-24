import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const MOCK_CREDENTIALS = {
  username: 'admin@example.com',
  password: 'password'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check credentials
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      // Set auth cookie
      cookies().set('auth-token', 'mock-token-value', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}