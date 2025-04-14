import { INTERNAL_API } from '@shared/constants';
import { User } from '@shared/types';
import { request } from '@shared/api/httpClient';

class UserService {
  public getProfile<T>(bffUrl?: string | null) {
    return request<T, User>({ path: [INTERNAL_API.PROFILE], bffUrl });
  }

  public updateProfile<T>(bffUrl: string | null, body: T | FormData) {
    return request<T, User>({
      path: [INTERNAL_API.PROFILE],
      method: 'PATCH',
      body,
      bffUrl,
    });
  }
}

export const userService = new UserService();
