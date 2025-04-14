import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { INTERNAL_API } from '@shared/constants';
import useSWRMutation from 'swr/mutation';
import type { User } from '@shared/types';
import { mutate } from 'swr';
import { uploadImage, userService } from '@shared/api/client';
import { getProfileUrl, getUrl } from '@shared/api';

export const useEditableAvatar = (user: User) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [imageId, setImageId] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, []);

  const userFormData = {
    name: user.name,
    slug: user.slug,
    description: user.description,
    imageId,
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
      setImageId(res.id);
    }
  }, [imageUploadTrigger]);

  useEffect(() => {
    if (file) {
      uploadImageCallback();
    }
  }, [file, uploadImageCallback]);

  const { trigger, isMutating } = useSWRMutation(
    getUrl({ path: [INTERNAL_API.IMAGE], bffUrl: currentLocation }),
    () => userService.updateProfile(currentLocation, userFormData)
  );

  const updateAvatar = useCallback(async () => {
    const res = await trigger();
    if (res?.image?.id) {
      setImageId('');
      await mutate(getProfileUrl(currentLocation));
    }
  }, [trigger, currentLocation]);

  useEffect(() => {
    if (imageId) updateAvatar();
  }, [imageId, updateAvatar]);

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
    inputRef.current?.click();
  };

  return {
    error,
    inputRef,
    isMutating: isMutating || imageUploadMutation,
    handleClick,
    handleFileChange,
  };
};
