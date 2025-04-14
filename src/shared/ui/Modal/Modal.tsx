'use client';

import { FC, ReactNode, useEffect, useState, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { USER_PROFILE_ID } from '@shared/constants';
import { useWindowWidth } from '@shared/hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const isDesktop = useWindowWidth(850);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(USER_PROFILE_ID);
      setContainer(isDesktop ? el : document.body);
    }
  }, [isDesktop]);

  if (!container || !isOpen) return null;

  const closeOnOutsideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={closeOnOutsideClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    container
  );
};

export default Modal;
