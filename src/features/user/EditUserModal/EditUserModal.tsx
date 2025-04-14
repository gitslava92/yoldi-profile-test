'use client';

import styles from './EditUserModal.module.scss';
import { Icons } from '@shared/ui/Icons';
import Button from '@shared/ui/Button';
import { FC, useState } from 'react';
import Modal from '@shared/ui/Modal';
import EditUserForm from '@features/user/EditUserForm';
import { User } from '@shared/types';

interface EditUserModalProps {
  user: User;
}

const EditUserModal: FC<EditUserModalProps> = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="secondary"
        className={styles.editButton}
        onClick={toggleModal}
      >
        <Icons.Edit />
        Редактировать
      </Button>

      <Modal isOpen={openModal} onClose={toggleModal}>
        <EditUserForm toggleModal={toggleModal} user={user} />
      </Modal>
    </>
  );
};

export default EditUserModal;
