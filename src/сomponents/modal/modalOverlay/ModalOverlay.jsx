import styles from './modalOverlay.module.css';

export function ModalOverlay({ handleOnCloseModal }) {
  return <div className={styles.overlay} onClick={handleOnCloseModal} />;
}
