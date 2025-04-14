import { NextResponse } from 'next/server';
import { uploadImage } from '@shared/api/server';
import { cookies } from 'next/headers';
import { API_KEY } from '@shared/constants';

export async function POST(req: Request) {
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

    const reqFormData = await req.formData();
    const image = await uploadImage(apiKey, reqFormData);

    return NextResponse.json(image);
  } catch (e) {
    return NextResponse.json(
      { status: 'error', ok: false, message: (e as Error).message },
      { status: 401 }
    );
  }
}
