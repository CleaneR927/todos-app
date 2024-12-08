import clsx from 'clsx';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { CgCloseO } from 'react-icons/cg';

const modalContainer = document.getElementById('modal');

export function Modal({
  handleOnInputChange,
  handleOnAdd,
  handleOnCloseModal,
  isAnimating,
  isExiting
}) {
  const modalClass = clsx(styles.modal, {
    [styles.modal_enter]: !isAnimating && !isExiting,
    [styles.modal_enter_active]: isAnimating,
    [styles.modal_exit_active]: isExiting
  });

  useEffect(() => {
    const handleEsc = (e) => {
      e.key === 'Escape' && handleOnCloseModal();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleOnCloseModal]);

  return ReactDOM.createPortal(
    <>
      <div className={modalClass}>
        <CgCloseO
          type="button"
          className={styles.button}
          onClick={handleOnCloseModal}
        />

        <h2 className={styles.title}>Добавить новое дело</h2>
        <label>
          <input
            className={styles.input}
            type="text"
            name="title"
            placeholder="Введите название дела"
            onChange={handleOnInputChange}
            autoComplete="off"
          />
        </label>
        <label>
          <textarea
            className={styles.input}
            type="text"
            name="description"
            placeholder="Введите описание дела"
            onChange={handleOnInputChange}
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          className={clsx(styles.button, styles.button__add)}
          onClick={handleOnAdd}
        >
          Добавить
        </button>
      </div>
      <ModalOverlay handleOnCloseModal={handleOnCloseModal} />
    </>,
    modalContainer
  );
}
