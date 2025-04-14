import { request } from '@shared/api';
import { AuthResponse } from '@shared/types';
import { API_KEY, BACKEND_API } from '@shared/constants';

export const uploadImage = <T>(apiKey: string, body: FormData) => {
  return request<T, AuthResponse>({
    path: [BACKEND_API.IMAGE],
    headers: { [API_KEY]: apiKey },
    method: 'POST',
    body,
  });
};
