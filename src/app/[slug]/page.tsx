import { FC } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

const NotFoundPage: FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Страница не найдена</h1>
      <p>Мы не смогли найти страницу по данному адресу.</p>
      <Link href="/" className={styles.notFoundPage}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
