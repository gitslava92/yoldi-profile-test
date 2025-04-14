import AuthForm from '@features/auth/AuthForm';
import { FC } from 'react';
import AuthPageLayout from '@shared/ui/AuthPageLayout';

const LoginPage: FC = () => {
  return (
    <AuthPageLayout>
      <AuthForm isLogin />
    </AuthPageLayout>
  );
};

export default LoginPage;
