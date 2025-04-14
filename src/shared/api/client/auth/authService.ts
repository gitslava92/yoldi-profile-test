import { INTERNAL_API } from '@shared/constants';
import { request } from '@shared/api/httpClient';
import { InternalAuthResponse, LogoutResponse, PathType } from '@shared/types';

class AuthService {
  public auth<T>(path: PathType, body: T | FormData, bffUrl?: string | null) {
    return request<T, InternalAuthResponse>({
      path,
      method: 'POST',
      body,
      bffUrl,
    });
  }

  public logout<T>(bffUrl?: string | null) {
    return request<T, LogoutResponse>({
      path: [INTERNAL_API.LOGOUT],
      method: 'POST',
      bffUrl,
    });
  }
}

export const authService = new AuthService();
