import { FC, PropsWithChildren } from 'react';
import './global.scss';
import { Metadata } from 'next';
import { inter } from '@shared/fonts';
import { SITE_DESCRIPTION, SITE_NAME } from '@shared/constants';
import styles from './layout.module.scss';
import Header from 'shared/ui/Header';
import Footer from 'shared/ui/Footer';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <div className={styles.layout}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
