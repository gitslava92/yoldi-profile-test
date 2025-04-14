import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { INTERNAL_API } from '@shared/constants';
import useSWRMutation from 'swr/mutation';
import type { User } from '@shared/types';
import { mutate } from 'swr';
import { useWindowWidth } from '@shared/hooks';
import { createValidator } from '@shared/libs';
import { userService } from '@shared/api/client';
import { getProfileUrl, getUrl } from '@shared/api';

interface FormData {
  name: string;
  slug: string;
  description: string;
}

const initialFormState: FormData = {
  name: '',
  slug: '',
  description: '',
};

export const useEditUserForm = (toggleModal: () => void, user: User) => {
  const router = useRouter();
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, [user.cover?.url]);

  const formData: FormData = {
    ...initialFormState,
    ...{
      name: user.name,
      slug: user.slug,
      description: user.description,
    },
    ...userFormData,
  };

  const { trigger, isMutating } = useSWRMutation(
    getUrl({ path: [INTERNAL_API.PROFILE], bffUrl: currentLocation }),
    () => userService.updateProfile(currentLocation, formData)
  );

  const isDirty = Object.entries(userFormData).some(
    ([key, val]) => initialFormState[key as keyof FormData] !== val
  );

  const validate = () => {
    const validationErrors: { [key: string]: string } = {};

    const nameErrors = createValidator(formData.name)
      .isRequired()
      .isMin(3)
      .isMax(50)
      .getErrors();
    if (nameErrors.length) validationErrors.name = nameErrors[0];

    const slugErrors = createValidator(formData.slug)
      .isRequired()
      .isMin(3)
      .isMax(50)
      .getErrors();
    if (slugErrors.length) validationErrors.slug = slugErrors[0];

    const descriptionErrors = createValidator(formData.description)
      .isMax(300)
      .getErrors();
    if (descriptionErrors.length)
      validationErrors.description = descriptionErrors[0];

    return validationErrors;
  };

  const reset = () => setUserFormData({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length) {
      setShowErrors(true);
      return;
    }

    const res = await trigger();
    if (typeof window !== 'undefined' && res && res.slug) {
      toggleModal();
      reset();
      await mutate(getProfileUrl(currentLocation));
      router.replace(res.slug);
    }
  };

  const errors = showErrors ? validate() : undefined;

  const isDesktop = useWindowWidth(850);

  return {
    handleSubmit,
    isDirty,
    errors,
    formData,
    isMutating,
    setUserFormData,
    isDesktop,
  };
};
