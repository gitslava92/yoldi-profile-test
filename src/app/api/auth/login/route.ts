import { NextResponse } from 'next/server';
import { authService } from '@shared/api/server';
import { cookies } from 'next/headers';
import { BACKEND_API, API_KEY, MAX_COOKIE_AGE } from '@shared/constants';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value } = await authService.login(body);

    (await cookies()).set(API_KEY, value, {
      httpOnly: true,
      path: BACKEND_API.HOME,
      secure: process.env.NODE_ENV === 'production',
      maxAge: MAX_COOKIE_AGE,
    });

    return NextResponse.json({ status: 200, ok: true });
  } catch (e) {
    return NextResponse.json(
      { status: 'error', ok: false, message: (e as Error).message },
      { status: 401 }
    );
  }
}
