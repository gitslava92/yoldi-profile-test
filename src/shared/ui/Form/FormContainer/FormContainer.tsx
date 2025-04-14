import { FC, PropsWithChildren } from 'react';
import styles from './FormContainer.module.scss';
import { classNames } from 'shared/libs';

interface FormContainerProps extends PropsWithChildren {
  className?: string;
}

const FormContainer: FC<FormContainerProps> = ({ className, children }) => {
  return (
    <div className={classNames(styles.formContainer, className)}>
      {children}
    </div>
  );
};

export default FormContainer;
