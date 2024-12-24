import { NextResponse } from 'next/server';

export async function GET() {
  // Replace this with your actual authentication check logic
  const isAuthenticated = false; // This should check your session/token

  return NextResponse.json({ authenticated: isAuthenticated });
}