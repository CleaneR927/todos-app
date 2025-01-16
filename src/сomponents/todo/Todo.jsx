import clsx from 'clsx';
import styles from './todo.module.css';
import { CgCloseO, CgCheck } from 'react-icons/cg';
import { FaStar } from 'react-icons/fa';

export function Todo({ todo, handleOnCheck, handleOnDelete, handleOnEdit }) {
  if (!todo) {
    return null;
  }

  const handleContainerClick = (event) => {
    const isCheckboxOrDeleteButton =
      event.target.closest(`.${styles.custom__checkbox}`) ||
      event.target.closest(`input[type="checkbox"]`) ||
      event.target.closest(`.${styles.button__delete}`);

    if (!isCheckboxOrDeleteButton) {
      handleOnEdit(todo);
    }
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
      event.stopPropagation();
    }
  };

  const hasDescription = Boolean(todo.description);

  return (
    <div
      className={clsx(styles.item, !hasDescription && styles['no-description'])}
      onClick={handleContainerClick}
      onKeyDown={(event) => handleKeyDown(event, handleOnEdit)}
      aria-label={`Редактировать задачу ${todo.title}`}
      role="button"
      tabIndex={0}
    >
      <h3 className={styles.title}>{todo.title}</h3>
      <p className={styles.description}>{todo.description}</p>
      <p className={styles.date}>
        Создано: {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <div className={styles.priority__container}>
        {todo.priority === 'Важно' && (
          <FaStar className={styles.priority__icon} />
        )}
      </div>
      <label htmlFor={todo.id} className={styles.custom__checkbox}>
        <input
          type="checkbox"
          id={todo.id}
          checked={todo.completed}
          onChange={() => handleOnCheck(todo.id)}
        />
        <span
          className={styles.custom__checkbox_icon}
          onKeyDown={(e) => {
            handleKeyDown(e, () => handleOnCheck(todo.id));
          }}
          aria-label={
            todo.completed ? 'Отметить незавершенным' : 'Отметить завершенным'
          }
          tabIndex={0}
        >
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
        onClick={() => handleOnDelete(todo.id)}
        onKeyDown={(e) => handleKeyDown(e, () => handleOnDelete(todo.id))}
        aria-label={`Удалить задачу ${todo.title}`}
        tabIndex={0}
      >
        X
      </CgCloseO>
    </div>
  );
}
