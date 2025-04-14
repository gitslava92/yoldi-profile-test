import { API_KEY, BACKEND_API } from '@shared/constants';
import { User } from '@shared/types';
import { request } from '@shared/api/httpClient';

class UserService {
  public getUsers<T>() {
    return request<T, User[]>({
      path: [BACKEND_API.USER],
    });
  }

  public getUser<T>(slug: string) {
    return request<T, User>({
      path: [BACKEND_API.USER, slug],
    });
  }

  public getProfile<T>(apiKey: string) {
    return request<T, User>({
      path: [BACKEND_API.PROFILE],
      headers: {
        [API_KEY]: apiKey,
      },
    });
  }

  public updateProfile<T>(apiKey: string, body: FormData) {
    return request<T, User>({
      path: [BACKEND_API.PROFILE],
      headers: { [API_KEY]: apiKey },
      method: 'PATCH',
      body,
    });
  }
}

export const userService = new UserService();
