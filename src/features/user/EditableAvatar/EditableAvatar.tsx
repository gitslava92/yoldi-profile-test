'use client';

import { FC } from 'react';
import type { User } from '@shared/types';
import styles from './EditableAvatar.module.scss';
import Avatar from '@shared/ui/Avatar';
import { Icons } from '@shared/ui/Icons';
import Spinner from '@shared/ui/Spinner';
import { useEditableAvatar } from './useEditableAvatar';

interface EditableAvatarProps {
  user: User;
}

const EditableAvatar: FC<EditableAvatarProps> = ({ user }) => {
  const { error, inputRef, isMutating, handleClick, handleFileChange } =
    useEditableAvatar(user);

  return (
    <div className={styles.editableAvatar}>
      <div className={styles.avatarWrapper} onClick={handleClick}>
        {isMutating ? (
          <Spinner />
        ) : (
          <Avatar
            name={user.name}
            image={user.image}
            className={styles.avatar}
          />
        )}
        <div className={styles.overlay}>
          <Icons.Camera />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditableAvatar;
