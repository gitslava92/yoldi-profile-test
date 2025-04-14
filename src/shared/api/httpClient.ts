import { INTERNAL_API, BACKEND_API } from '@shared/constants';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface RequestParams<T> {
  path: (keyof typeof INTERNAL_API | keyof typeof BACKEND_API | string)[];
  method?: RequestMethod;
  body?: T | FormData;
  headers?: HeadersInit;
  bffUrl?: string | null;
}

interface GetUrlParams {
  path: (keyof typeof INTERNAL_API | keyof typeof BACKEND_API | string)[];
  bffUrl?: string | null;
}

export function getUrl({ path, bffUrl }: GetUrlParams) {
  return [
    bffUrl || process.env.NEXT_PUBLIC_API_URL,
    ...path.map((path) => path.replace(/^\/+/, '')),
  ].join('/');
}

export function getProfileUrl(currentLocation: string | null) {
  return currentLocation
    ? getUrl({ path: [INTERNAL_API.PROFILE], bffUrl: currentLocation })
    : null;
}

export async function request<T, R>({
  path,
  method = 'GET',
  body,
  headers = {},
  bffUrl,
}: RequestParams<T>): Promise<R> {
  const url = getUrl({ path, bffUrl });

  const isFormData = body instanceof FormData;

  const options: RequestInit = {
    method,
    headers: {
      ...(method !== 'GET' && !isFormData
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }

  return res.json();
}
