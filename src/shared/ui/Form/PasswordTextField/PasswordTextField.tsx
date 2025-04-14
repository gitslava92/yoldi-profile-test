'use client';

import {
  useState,
  useRef,
  FC,
  ReactNode,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';
import styles from './PasswordTextField.module.scss';
import { Icons } from '@shared/ui/Icons';
import { classNames } from 'shared/libs';
import TextField from 'shared/ui/Form/TextField';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  iconLeft?: ReactNode;
  placeholder?: string;
}

const PasswordTextField: FC<PasswordInputProps> = ({
  value,
  onChange,
  error,
  iconLeft,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFilled(!!e.target.value);
    if (onChange) onChange(e);
  };

  const passwordVisibilityIcon = (
    <button
      type="button"
      className={styles.iconButton}
      onClick={handleTogglePasswordVisibility}
    >
      {showPassword ? (
        <Icons.EyeSlash
          className={classNames(styles.icon, isFilled && styles.filled)}
        />
      ) : (
        <Icons.Eye
          className={classNames(styles.icon, isFilled && styles.filled)}
        />
      )}
    </button>
  );

  return (
    <TextField
      ref={inputRef}
      error={error}
      iconLeft={iconLeft}
      iconRight={passwordVisibilityIcon}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default PasswordTextField;
