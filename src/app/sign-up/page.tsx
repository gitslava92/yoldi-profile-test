import AuthForm from '@features/auth/AuthForm';
import AuthPageLayout from '@shared/ui/AuthPageLayout';
import { FC } from 'react';

const SignUpPage: FC = () => {
  return (
    <AuthPageLayout>
      <AuthForm />
    </AuthPageLayout>
  );
};

export default SignUpPage;
