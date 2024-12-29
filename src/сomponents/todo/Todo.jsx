import styles from './todo.module.css';
import { CgCloseO, CgCheck, CgPen } from 'react-icons/cg';

export function Todo({ todo, handleOnCheck, handleOnDelete, handleOnEdit }) {
  if (!todo) {
    return null;
  }

  return (
    <div className={styles.item}>
      <div
        className={styles.content}
        onClick={handleOnEdit}
        aria-label={`Редактировать задачу ${todo.title}`}
      >
        <h3 className={styles.title}>{todo.title}</h3>
        <p className={styles.description}>{todo.description}</p>
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
