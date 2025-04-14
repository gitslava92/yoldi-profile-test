'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@shared/ui/Button';
import { useRouter } from 'next/navigation';
import { INTERNAL_API } from '@shared/constants';
import { mutate } from 'swr';
import type { ButtonProps } from '@shared/ui/Button/types';
import useSWRMutation from 'swr/mutation';
import { getProfileUrl, getUrl } from '@shared/api';
import { authService } from '@shared/api/client';
import Spinner from '@shared/ui/Spinner';
import styles from './AuthButton.module.scss';

interface AuthButtonProps extends ButtonProps {
  href: string;
  isLogout?: boolean;
}

const AuthButton: FC<AuthButtonProps> = ({
  href,
  children,
  isLogout,
  ...rest
}) => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, []);

  const { trigger, isMutating } = useSWRMutation(
    currentLocation
      ? getUrl({ path: [INTERNAL_API.LOGOUT], bffUrl: currentLocation })
      : null,
    () => authService.logout(currentLocation)
  );

  const handleClick = async () => {
    if (isLogout && typeof window !== 'undefined') {
      const res = await trigger();
      if (res?.ok) {
        mutate(getProfileUrl(currentLocation));
      }
    }
    router.push(href);
  };

  return (
    <Button onClick={handleClick} {...rest}>
      {isMutating ? <Spinner className={styles.spinner} /> : children}
    </Button>
  );
};

export default AuthButton;
