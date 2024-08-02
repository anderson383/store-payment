import * as Dialog from '@radix-ui/react-dialog';

import React, {
  useEffect, useState
} from 'react';
import styles from './modal.module.scss';

interface ModalPanelProps {
  children?: any;
  openModal: any;
  setOpenModal: any;
  isCloseable?: boolean;
  className?: string;
  closeOutClick?: boolean;
  title?:string;
}

const Modal: React.FC<ModalPanelProps> = ({
  children,
  openModal,
  setOpenModal,
  isCloseable,
  className,
  closeOutClick = false,
  title
}) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
  }, []);

  return (
    isLoad && (
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialog_overlay} onClick={() => setOpenModal(true)} />
          <Dialog.Content
            className={`${ styles.dialog_content } ${ className }`}
            onPointerDownOutside={e => closeOutClick && e.preventDefault()}
          >
            {/* {isCloseable && (
              <button className={`btn-transparent ${ styles.btn_close } `} onClick={() => setOpenModal(false)}>
                <span className="material-icons">highlight_off</span>
              </button>
            )} */}
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  );
};

export default Modal;
