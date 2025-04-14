'use client';

import type { User } from '@shared/types';
import UserListItem from '@entities/user/UserListItem';
import styles from './UsersList.module.scss';
import { FC } from 'react';
import { useUsersList } from './useUsersList';

interface UsersListProps {
  users: User[];
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  const {
    listRef,
    containerHeight,
    handleScroll,
    itemHeight,
    offsetTop,
    visibleUsers,
  } = useUsersList(users);
  return (
    <div
      ref={listRef}
      className={styles.usersList}
      style={{ height: containerHeight, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: users.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetTop}px)` }}>
          {!!visibleUsers.length &&
            visibleUsers.map((user) => (
              <UserListItem key={user.email} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
