import UserInfo from '@shared/ui/UserInfo';
import styles from './UserListItem.module.scss';
import type { User } from '@shared/types';
import { buildRoute, classNames } from 'shared/libs';
import Link from 'next/link';
import { PATH } from '@shared/constants';
import { FC } from 'react';

interface UserListItemProps {
  user: User;
}

const UserListItem: FC<UserListItemProps> = ({ user }) => {
  return (
    <Link
      href={buildRoute(PATH.USER, user.slug)}
      className={styles.userListItem}
    >
      <UserInfo user={user} reverse>
        <div className={styles.infoWrapper}>
          <span className={classNames(styles.info, styles.name)}>
            {user.name}
          </span>
          <span
            className={classNames(styles.info, styles.email, styles.mobile)}
          >
            {user.email}
          </span>
        </div>
      </UserInfo>
      <p className={classNames(styles.email, styles.desktop)}>{user.email}</p>
    </Link>
  );
};

export default UserListItem;
