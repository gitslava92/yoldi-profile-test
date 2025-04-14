import { FC } from 'react';
import styles from './Button.module.scss';
import { classNames } from 'shared/libs';
import type { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  className,
  ...props
}) => {
  const btnClass = classNames(
    styles.button,
    styles[variant],
    { [styles.disabled]: disabled },
    className
  );

  return (
    <button className={btnClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
