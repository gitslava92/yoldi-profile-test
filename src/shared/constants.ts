export const SITE_NAME = 'yoldi.agency - тестовое задание';

export const SITE_DESCRIPTION = 'Тестовое задание выполнил Вячеслав Пустовит';

export const API_KEY = 'X-API-KEY';

export const enum PATH {
  HOME = '/',
  USER = '/user',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  PROFILE = '/profile',
  IMAGE = '/image',
}

export const enum INTERNAL_API {
  PROFILE = '/api/profile',
  LOGIN = '/api/auth/login',
  LOGOUT = '/api/auth/logout',
  SIGN_UP = '/api/auth/sign-up',
  IMAGE = '/api/image',
}

export const enum BACKEND_API {
  HOME = '/',
  USER = '/user',
  PROFILE = '/profile',
  LOGIN = '/auth/login',
  SIGN_UP = '/auth/sign-up',
  IMAGE = '/image',
}

export const MAX_COOKIE_AGE = 60 * 60 * 24; // 1 day

export const USER_PROFILE_ID = 'user-profile-modal-container';
