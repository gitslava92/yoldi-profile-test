import { FC, PropsWithChildren } from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@shared/ui/Avatar';
import type { User } from '@shared/types';
import Link from 'next/link';
import { buildRoute } from 'shared/libs';
import { PATH } from '@shared/constants';

interface UserInfoProps extends PropsWithChildren {
  user: User;
  isLink?: boolean;
  reverse?: boolean;
}

const UserInfo: FC<UserInfoProps> = ({ user, isLink, reverse, children }) => {
  const Component = isLink ? Link : 'div';
  return (
    <Component
      href={buildRoute(PATH.PROFILE, user.slug)}
      className={`${styles.userInfo} ${reverse ? styles.reverse : ''}`}
    >
      {children}
      <Avatar name={user.name} image={user.image} />
    </Component>
  );
};

export default UserInfo;
