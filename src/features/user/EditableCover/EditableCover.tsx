'use client';

import type { User } from '@shared/types';
import { FC } from 'react';
import styles from './EditableCover.module.scss';
import Button from '@shared/ui/Button';
import { useEditableCover } from './useEditableCover';
import Spinner from '@shared/ui/Spinner';
import { Icons } from '@shared/ui/Icons';

interface EditableCoverProps {
  user: User;
  coverId?: string;
}

const EditableCover: FC<EditableCoverProps> = ({ user, coverId }) => {
  const {
    error,
    inputRef,
    isMutating,
    handleClick,
    handleFileChange,
    buttonText,
    currentCoverUrl,
  } = useEditableCover(user);

  return (
    <div
      key={coverId}
      className={styles.editableCover}
      style={
        user?.cover?.url
          ? { backgroundImage: `url(${currentCoverUrl})` }
          : undefined
      }
    >
      {isMutating ? (
        <Spinner />
      ) : (
        <div className={styles.buttonWrapper}>
          <Button variant="secondary" onClick={handleClick}>
            {user?.cover?.id ? <Icons.Remove /> : <Icons.Upload />}
            {isMutating ? <Spinner /> : buttonText}
            <Icons.Image />
          </Button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditableCover;
