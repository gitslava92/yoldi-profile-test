import { FC } from 'react';
import styles from './page.module.scss';
import UsersList from '@features/user/UsersList';
import { userService } from '@shared/api/server';

const HomePage: FC = async () => {
  const users = await userService.getUsers();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Список пользователей</h1>
      <div className={styles.listContainer}>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default HomePage;
