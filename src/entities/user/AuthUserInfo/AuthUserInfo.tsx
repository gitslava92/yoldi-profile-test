'use client';

import React, { useEffect, useState } from 'react';
import UserInfo from '@shared/ui/UserInfo';
import styles from '@shared/ui/Header/Header.module.scss';
import AuthButton from 'features/auth/AuthButton';
import { PATH } from '@shared/constants';
import useSWR from 'swr';
import { userService } from '@shared/api/client';
import { getProfileUrl } from '@shared/api';

const AuthUserInfo = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const { data: user, error } = useSWR(
    getProfileUrl(currentLocation),
    () => userService.getProfile(currentLocation),
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, []);

  return (
    <>
      {user && !error ? (
        <UserInfo user={user} isLink>
          <span className={styles.username}>{user.name}</span>
        </UserInfo>
      ) : (
        <AuthButton href={PATH.LOGIN} variant="secondary">
          Войти
        </AuthButton>
      )}
    </>
  );
};

export default AuthUserInfo;
