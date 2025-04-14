import { FC } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { Icons } from '@shared/ui/Icons';
import AuthUserInfo from '@entities/user/AuthUserInfo';
import { PATH } from '@shared/constants';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.item}>
        <Link href={PATH.HOME} className={styles.link}>
          <Icons.Logo />
        </Link>
        <p className={styles.title}>
          Разрабатываем и запускаем сложные веб проекты
        </p>
      </div>
      <div className={styles.item}>
        <AuthUserInfo />
      </div>
    </header>
  );
};

export default Header;
