'use client';

import React, { useEffect, useState } from 'react';
import Profile from '@widgets/users/Profile';
import useSWR from 'swr';
import { getProfileUrl } from '@shared/api';
import { userService } from '@shared/api/client';

const ClientProfile = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const { data: user } = useSWR(
    getProfileUrl(currentLocation),
    () => userService.getProfile(currentLocation),
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, []);

  return <>{!!user && <Profile user={user} isOwner />}</>;
};

export default ClientProfile;
