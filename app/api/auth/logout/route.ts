import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the auth cookie
    cookies().delete('auth-token');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: error,
        message: 'Failed to logout' 
      }, 
      { 
        status: 500 
      }
    );
  }
}