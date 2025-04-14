'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';
import { PATH } from '@shared/constants';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

const Footer: FC = () => {
  const pathname = usePathname();
  const isLogin = pathname === PATH.LOGIN;
  const isSignUp = pathname === PATH.SIGN_UP;
  const isFooterActive = isLogin || isSignUp;

  const link = isLogin ? PATH.SIGN_UP : PATH.LOGIN;
  const text = isLogin ? 'Уже есть аккаунт? ' : 'Еще нет аккаунта? ';
  const linkText = isLogin ? 'Зарегистрироваться' : 'Войти';

  return (
    <>
      {isFooterActive && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>
              {text}
              <Link href={link} className={styles.link}>
                {linkText}
              </Link>
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
