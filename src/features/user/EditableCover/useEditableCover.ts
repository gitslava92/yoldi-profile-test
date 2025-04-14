import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { INTERNAL_API } from '@shared/constants';
import useSWRMutation from 'swr/mutation';
import type { User } from '@shared/types';
import { mutate } from 'swr';
import { getProfileUrl, getUrl } from '@shared/api';
import { uploadImage, userService } from '@shared/api/client';

export const useEditableCover = (user: User) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [currentCoverUrl, setCurrentCoverUrl] = useState(user.cover?.url);
  const [coverId, setCoverId] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentCoverUrl(user.cover?.url);
      setCurrentLocation(window.location.origin);
    }
  }, [user.cover?.url]);

  const userFormData = {
    name: user.name,
    slug: user.slug,
    description: user.description,
    coverId: coverId ? coverId : null,
  };

  const { trigger: imageUploadTrigger, isMutating: imageUploadMutation } =
    useSWRMutation(
      getUrl({ path: [INTERNAL_API.IMAGE], bffUrl: currentLocation }),
      () => {
        const formData = new FormData();
        if (file) formData.append('file', file);
        return uploadImage<File | null>(currentLocation, formData);
      }
    );

  const uploadImageCallback = useCallback(async () => {
    const res = await imageUploadTrigger();
    if (res?.id) {
      setCoverId(res.id);
    }
  }, [imageUploadTrigger]);

  useEffect(() => {
    if (file) {
      uploadImageCallback();
    }
  }, [file, uploadImageCallback]);

  const { trigger, isMutating } = useSWRMutation(
    getUrl({ path: [INTERNAL_API.PROFILE], bffUrl: currentLocation }),
    () => userService.updateProfile(currentLocation, userFormData)
  );

  const updateCover = useCallback(
    async (condition: boolean) => {
      const res = await trigger();
      if (!!res?.cover?.id === condition) {
        setCoverId('');
        await mutate(getProfileUrl(currentLocation));
      }
    },
    [trigger, currentLocation]
  );

  useEffect(() => {
    if (coverId) updateCover(true);
  }, [coverId, updateCover]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length !== 1) {
      setError('Выберите только один файл.');
      return;
    }

    const file = files[0];
    const isValid = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isValid) {
      setError('Только файлы .jpg и .png поддерживаются.');
      return;
    }

    setError(null);
    setFile(file);
  };

  const handleClick = () => {
    if (!user?.cover?.id) {
      inputRef.current?.click();
    } else {
      setCoverId('');
      updateCover(false);
    }
  };

  const buttonText = user?.cover?.id ? 'Удалить' : 'Загрузить';

  return {
    error,
    inputRef,
    isMutating: isMutating || imageUploadMutation,
    handleClick,
    handleFileChange,
    buttonText,
    currentCoverUrl,
  };
};
