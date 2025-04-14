import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';
import { classNames } from 'shared/libs';

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  (
    { value, error, label, placeholder, onChange, ...rest }: TextFieldProps,
    ref
  ) => {
    const textareaClassNames = classNames(
      styles.textarea,
      error && styles.textareaError
    );

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={styles.textareaContainer}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.textareaWrapper}>
          <textarea
            ref={ref}
            placeholder={placeholder}
            className={textareaClassNames}
            value={value}
            onChange={handleChange}
            {...rest}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
