import { request } from '@shared/api';
import { Image } from '@shared/types';
import { INTERNAL_API } from '@shared/constants';

export const uploadImage = <T>(bffUrl: string | null, body: T | FormData) => {
  return request<T, Image>({
    path: [INTERNAL_API.IMAGE],
    method: 'POST',
    body,
    bffUrl,
  });
};
