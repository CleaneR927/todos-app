import styles from './ModalOverlay.module.css';

export function ModalOverlay({ handleOnCloseModal }) {
  return <div className={styles.overlay} onClick={handleOnCloseModal} />;
}
