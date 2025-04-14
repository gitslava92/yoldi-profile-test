import { NextResponse } from 'next/server';
import { userService } from '@shared/api/server';
import { cookies } from 'next/headers';
import { API_KEY } from '@shared/constants';

export async function GET() {
  const apiKey = (await cookies()).get(API_KEY)?.value;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'error',
        ok: false,
        message: 'Вы не авторизованы. Авторизуйтесь',
      },
      { status: 401 }
    );
  }

  try {
    const profile = await userService.getProfile(apiKey);
    return NextResponse.json(profile);
  } catch (e) {
    return NextResponse.json(
      { status: 'error', ok: false, message: (e as Error).message },
      { status: 401 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const apiKey = (await cookies()).get(API_KEY)?.value;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'error',
          ok: false,
          message: 'Вы не авторизованы. Авторизуйтесь',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const user = await userService.updateProfile(apiKey, body);

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json(
      { status: 'error', message: (e as Error).message },
      { status: 401 }
    );
  }
}
