import { FC } from 'react';
import styles from './Avatar.module.scss';
import Image from 'next/image';
import type { Image as ImageType } from '@shared/types';
import { classNames, isUrl } from 'shared/libs';

interface AvatarProps {
  name: string;
  image?: ImageType;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ name, image, className }) => {
  const isImage = image?.url && isUrl(image?.url || '');
  const avatarClassName = classNames(styles.avatar, className);
  return (
    <>
      {isImage ? (
        <Image
          src={image.url}
          alt={`${name || 'user'}-avatar`}
          className={avatarClassName}
          width={Number(image.width)}
          height={Number(image.height)}
        />
      ) : (
        <div className={avatarClassName}>{name?.charAt(0)?.toUpperCase()}</div>
      )}
    </>
  );
};

export default Avatar;
