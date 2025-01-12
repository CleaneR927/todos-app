import clsx from 'clsx';
import styles from './acceptDelete.module.css';

export function AcceptDeleteComponent({ todo, onDelete, onClose }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Подтверждение удаления</h2>
      <p className={styles.text}>
        Вы уверены, что хотите удалить задачу "{todo?.title}"?
      </p>
      <div className={styles.buttonsContainer}>
        <button
          className={clsx(styles.button, styles.button__delete)}
          onClick={() => onDelete(todo.id)}
        >
          Удалить
        </button>
        <button className={styles.button} onClick={onClose}>
          Отменить
        </button>
      </div>
    </div>
  );
}
