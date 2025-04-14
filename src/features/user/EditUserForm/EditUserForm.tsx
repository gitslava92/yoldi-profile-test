'use client';

import styles from './EditUserForm.module.scss';
import Button from '@shared/ui/Button';
import Spinner from '@shared/ui/Spinner';
import { FC } from 'react';
import { useEditUserForm } from './useEditUserForm';
import type { User } from '@shared/types';
import TextField from '@shared/ui/Form/TextField';
import FormContainer from '@shared/ui/Form/FormContainer';
import TextArea from '@shared/ui/Form/TextArea';

interface EditUserFormProps {
  user: User;
  toggleModal: () => void;
}

const EditUserForm: FC<EditUserFormProps> = ({ toggleModal, user }) => {
  const {
    isDirty,
    handleSubmit,
    errors,
    formData,
    setUserFormData,
    isMutating,
    isDesktop,
  } = useEditUserForm(toggleModal, user);

  return (
    <FormContainer className={styles.formContainer}>
      <h1 className={styles.title}>Редактировать профиль</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Имя"
          placeholder="Имя"
          error={errors?.name}
          value={formData.name}
          onChange={(e) => {
            setUserFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <div>
          <div className={styles.label}>Адрес профиля</div>
          <div className={styles.slugContainer}>
            <div className={styles.address}>example.com/</div>
            <TextField
              placeholder="Адрес профиля"
              error={errors?.slug}
              value={formData.slug}
              onChange={(e) => {
                setUserFormData((prev) => ({ ...prev, slug: e.target.value }));
              }}
              className={styles.slugInput}
            />
          </div>
        </div>
        <TextArea
          label="Описание"
          placeholder="Описание"
          rows={isDesktop ? 5 : 10}
          error={errors?.description}
          value={formData.description}
          onChange={(e) => {
            setUserFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />
        <div className={styles.buttonsContainer}>
          <Button
            variant="secondary"
            className={styles.button}
            onClick={toggleModal}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={!isDirty} className={styles.button}>
            {isMutating ? <Spinner className={styles.spinner} /> : 'Сохранить'}
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default EditUserForm;
