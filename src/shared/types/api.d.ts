import { BACKEND_API, INTERNAL_API } from '@shared/constants';

export interface AuthResponse {
  value: string;
}

export interface InternalAuthResponse {
  status: number;
  ok: true;
}

export interface LogoutResponse {
  status: number;
  ok: true;
}

export type PathType = (
  | keyof typeof INTERNAL_API
  | keyof typeof BACKEND_API
  | string
)[];
