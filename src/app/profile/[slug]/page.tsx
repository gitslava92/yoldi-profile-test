import ClientProfile from '@processes/ClientProfile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль пользователя',
  description: 'Детальная информация о пользователе',
};

const ProfilePage = async () => {
  return <ClientProfile />;
};

export default ProfilePage;
