import { FC } from 'react';
import styles from './Spinner.module.scss';
import { classNames } from 'shared/libs';

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={classNames(styles.spinner, className)}></div>
    </div>
  );
};

export default Spinner;
