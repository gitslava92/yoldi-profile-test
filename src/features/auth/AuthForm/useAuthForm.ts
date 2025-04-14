import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { INTERNAL_API, PATH } from '@shared/constants';
import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { createValidator } from '@shared/libs';
import { authService } from '@shared/api/client';
import { getProfileUrl, getUrl } from '@shared/api';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const initialLoginFormState: FormData = {
  email: '',
  password: '',
};

export const useAuthForm = (isLogin?: boolean) => {
  const router = useRouter();
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location.origin);
    }
  }, []);

  const initialFormState: FormData = {
    ...initialLoginFormState,
    ...(!isLogin && { name: '' }),
  };

  const formData: FormData = {
    ...initialFormState,
    ...userFormData,
  };

  const path = isLogin ? INTERNAL_API.LOGIN : INTERNAL_API.SIGN_UP;
  const { trigger, isMutating } = useSWRMutation(
    currentLocation ? getUrl({ path: [path], bffUrl: currentLocation }) : null,
    () => authService.auth<FormData>([path], formData, currentLocation)
  );

  const isDirty = Object.entries(userFormData).some(
    ([key, val]) => initialFormState[key as keyof FormData] !== val
  );

  const validate = () => {
    const validationErrors: { [key: string]: string } = {};

    if (!isLogin && formData.name) {
      const nameErrors = createValidator(formData.name)
        .isRequired()
        .isMin(3)
        .isMax(50)
        .getErrors();
      if (nameErrors.length) validationErrors.name = nameErrors[0];
    }

    const emailErrors = createValidator(formData.email)
      .isRequired()
      .isEmail()
      .getErrors();
    if (emailErrors.length) validationErrors.email = emailErrors[0];

    const passwordErrors = createValidator(formData.password)
      .isRequired()
      .isMin(6)
      .getErrors();
    if (passwordErrors.length) validationErrors.password = passwordErrors[0];

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
    if (typeof window !== 'undefined' && res?.ok) {
      mutate(getProfileUrl(currentLocation));
    }

    reset();
    router.push(PATH.HOME);
  };

  const errors = showErrors ? validate() : undefined;

  const title = `${isLogin ? 'Вход' : 'Регистрация\n'} в Yoldi Agency`;
  const buttonText = isLogin ? 'Войти' : 'Создать аккаунт';

  return {
    title,
    buttonText,
    handleSubmit,
    isLogin,
    isDirty,
    errors,
    formData,
    isMutating,
    setUserFormData,
  };
};
