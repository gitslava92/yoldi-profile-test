import type { User } from '@shared/types';
import styles from './Profile.module.scss';
import { PATH, USER_PROFILE_ID } from '@shared/constants';
import Avatar from '@shared/ui/Avatar';
import { FC } from 'react';
import AuthButton from 'features/auth/AuthButton';
import { Icons } from '@shared/ui/Icons';
import EditableCover from '@features/user/EditableCover';
import EditableAvatar from '@features/user/EditableAvatar';
import EditUserModal from '@features/user/EditUserModal';

interface ProfileProps {
  user: User;
  isOwner?: boolean;
}

const Profile: FC<ProfileProps> = ({ user, isOwner }) => {
  return (
    <div className={styles.profile} id={USER_PROFILE_ID}>
      {isOwner ? (
        <EditableCover user={user} />
      ) : (
        <div
          className={styles.cover}
          style={{
            ...(user?.cover?.url && {
              backgroundImage: `url(${user.cover.url})`,
            }),
          }}
        />
      )}
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          {isOwner ? (
            <EditableAvatar user={user} />
          ) : (
            <Avatar
              name={user.name}
              image={user.image}
              className={styles.avatar}
            />
          )}
          <div className={styles.content}>
            <div className={styles.userInfo}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.editButtonContainer}>
              {isOwner && <EditUserModal user={user} />}
            </div>
          </div>
          <div className={styles.userInfo}>
            {user.description && (
              <p className={styles.description}>{user.description}</p>
            )}
            {isOwner && (
              <div className={styles.logoutContainer}>
                <AuthButton
                  variant="secondary"
                  className={styles.logoutButton}
                  href={PATH.HOME}
                  isLogout
                >
                  <Icons.Logout />
                  Выйти
                </AuthButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
