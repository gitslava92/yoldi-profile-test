import { request } from '@shared/api';
import { User } from '@shared/types';
import { INTERNAL_API } from '@shared/constants';

export const uploadImage = <T>(body: T | FormData) => {
  return request<T, User>({
    path: [INTERNAL_API.IMAGE],
    method: 'POST',
    body,
  });
};
