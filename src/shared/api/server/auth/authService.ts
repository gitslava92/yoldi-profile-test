import { BACKEND_API } from '@shared/constants';
import { request } from '@shared/api/httpClient';
import { AuthResponse } from '@shared/types';

class AuthService {
  public login<T>(body: FormData) {
    return request<T, AuthResponse>({
      path: [BACKEND_API.LOGIN],
      method: 'POST',
      body,
    });
  }

  public signUp<T>(body: FormData) {
    return request<T, AuthResponse>({
      path: [BACKEND_API.SIGN_UP],
      method: 'POST',
      body,
    });
  }
}

export const authService = new AuthService();
