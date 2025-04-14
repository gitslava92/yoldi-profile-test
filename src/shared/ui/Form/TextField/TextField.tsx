import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './TextField.module.scss';
import { classNames } from 'shared/libs';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      value,
      error,
      iconLeft,
      iconRight,
      label,
      placeholder,
      onChange,
      type = 'text',
      className,
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    const inputClassNames = classNames(
      styles.input,
      error && styles.inputError,
      iconLeft ? styles.inputLeft : undefined,
      iconRight ? styles.inputRight : undefined,
      className
    );

    return (
      <div className={styles.inputContainer}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={inputClassNames}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (onChange) {
                onChange(e);
              }
            }}
            {...rest}
          />
          {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
