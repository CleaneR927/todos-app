import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from './modalOverlay/ModalOverlay';
import styles from './modal.module.css';
import { CgCloseO } from 'react-icons/cg';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const modalContainer = document.getElementById('modal');

export function Modal({ onClose, isAnimating, isExiting, children }) {
  const modalClass = `${styles.modal} ${isAnimating ? styles.modal_enter_active : ''} ${isExiting ? styles.modal_exit_active : ''}`;

  const { trapRef } = useFocusTrap(true);

  useEffect(() => {
    const lockScroll = () => {
      document.body.classList.add(styles.overflow__hidden);
    };

    const unlockScroll = () => {
      document.body.classList.remove(styles.overflow__hidden);
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    lockScroll();
    return () => {
      unlockScroll();
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div ref={trapRef} className={modalClass} role="dialog" aria-modal="true">
        <CgCloseO
          type="button"
          className={styles.button}
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        />
        {children}
      </div>
      <ModalOverlay handleOnCloseModal={onClose} />
    </>,
    modalContainer
  );
}
