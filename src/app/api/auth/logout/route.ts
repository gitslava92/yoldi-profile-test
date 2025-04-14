import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { API_KEY } from '@shared/constants';

export async function POST() {
  try {
    (await cookies()).delete(API_KEY);
    return NextResponse.json({ status: 200, ok: true });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
