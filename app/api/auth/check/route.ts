import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the auth token from cookies
    const authToken = cookies().get('auth-token');

    // Check if token exists and is valid
    const isAuthenticated = !!authToken?.value;

    return NextResponse.json({ 
      authenticated: isAuthenticated 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      authenticated: false 
    });
  }
}