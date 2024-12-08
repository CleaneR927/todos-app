import styles from './Todo.module.css';
import { CgCloseO, CgCheck } from 'react-icons/cg';

export function Todo({ todo, handleOnCheck, handleOnDelete }) {
  if (!todo) {
    return null;
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.title}>{todo.title}</h3>
      <p className={styles.description}>{todo.description}</p>
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
