'use client';

import styles from './AuthForm.module.scss';
import { Icons } from '@shared/ui/Icons';
import Button from '@shared/ui/Button';
import Spinner from '@shared/ui/Spinner';
import { useAuthForm } from './useAuthForm';
import { FC } from 'react';
import FormContainer from '@shared/ui/Form/FormContainer';
import TextField from '@shared/ui/Form/TextField';
import PasswordTextField from '@shared/ui/Form/PasswordTextField';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: FC<AuthFormProps> = ({ isLogin }) => {
  const {
    title,
    buttonText,
    handleSubmit,
    isDirty,
    errors,
    formData,
    isMutating,
    setUserFormData,
  } = useAuthForm(isLogin);
  return (
    <FormContainer>
      <h1 className={styles.title}>{title}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <TextField
            iconLeft={<Icons.User />}
            placeholder="Имя"
            error={errors?.name}
            value={formData.name}
            onChange={(e) => {
              setUserFormData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        )}
        <TextField
          iconLeft={<Icons.Mail />}
          placeholder="E-mail"
          error={errors?.email}
          value={formData.email}
          onChange={(e) => {
            setUserFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <PasswordTextField
          iconLeft={<Icons.Lock />}
          placeholder="Пароль"
          error={errors?.password}
          value={formData.password}
          onChange={(e) => {
            setUserFormData((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <Button type="submit" disabled={!isDirty} className={styles.button}>
          {isMutating ? <Spinner className={styles.spinner} /> : buttonText}
        </Button>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
