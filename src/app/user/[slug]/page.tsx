import Profile from 'widgets/users/Profile';
import { userService } from '@shared/api/server';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  return {
    title: `Профиль пользователя${slug ? ` - ${slug}` : ''}`,
    description: slug || 'Детальная информация о пользователе',
  };
}

const UserPage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const slug = params.slug;
  const user = await userService.getUser(slug);

  return <Profile user={user} />;
};

export default UserPage;
