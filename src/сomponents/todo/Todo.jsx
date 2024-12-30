import clsx from 'clsx';
import styles from './todo.module.css';
import { CgCloseO, CgCheck } from 'react-icons/cg';
import { FaStar } from 'react-icons/fa';

export function Todo({ todo, handleOnCheck, handleOnDelete, handleOnEdit }) {
  if (!todo) {
    return null;
  }

  const handleContainerClick = (event) => {
    if (
      event.target.closest(`.${styles.custom__checkbox}`) ||
      event.target.closest(`input[type="checkbox"]`) ||
      event.target.closest(`.${styles.button__delete}`)
    ) {
      return;
    }
    handleOnEdit();
  };

  const hasDescription = !!todo.description;

  return (
    <div
      className={clsx(
        styles.item,
        !hasDescription ? styles['no-description'] : ''
      )}
      onClick={handleContainerClick}
      aria-label={`Редактировать задачу ${todo.title}`}
    >
      <h3 className={styles.title}>{todo.title}</h3>
      <p className={styles.description}>{todo.description}</p>
      <div className={styles.priority__container}>
        {todo.priority === 'Важно' ? (
          <FaStar className={styles.priority__icon} />
        ) : (
          ''
        )}
      </div>
      <label htmlFor={todo.id} className={styles.custom__checkbox}>
        <input
          type="checkbox"
          id={todo.id}
          checked={todo.completed}
          onChange={() => setTimeout(() => handleOnCheck(todo.id), 200)}
          aria-label={
            todo.completed ? 'Отметить незавершенным' : 'Отметить завершенным'
          }
        />
        <span className={styles.custom__checkbox_icon}>
          <CgCheck />
        </span>
        <span className={styles.visuale_hidden}>
          {todo.completed ? 'Выполнено' : 'Не выполнено'}
        </span>
      </label>
      <CgCloseO
        type="button"
        className={styles.button__delete}
        id={todo.id}
        onClick={() => {
          setTimeout(() => {
            handleOnDelete(todo.id);
          }, 200);
        }}
        aria-label="Удалить задачу"
      >
        X
      </CgCloseO>
    </div>
  );
}
