import React from 'react';
import styles from './modalForm.module.css';
import clsx from 'clsx';
import { useTodoValidation } from '../../hooks/useTodoValidation';

export function ModalFormCreate({ onAdd, onClose }) {
  const { todo, errors, isFormValid, handleOnInputChange, setTodo } =
    useTodoValidation();

  const handleOnSubmit = () => {
    if (isFormValid) {
      onAdd(todo);
      setTodo({ title: '', description: '' });
      onClose();
    }
  };

  return (
    <>
      <h2 className={styles.title}>Добавить новое дело</h2>
      <label>
        <input
          className={clsx(styles.input, errors.title ? styles.error : '')}
          type="text"
          name="title"
          placeholder="Введите название дела"
          onChange={handleOnInputChange}
          value={todo.title}
          autoComplete="off"
        />
        {errors.title && (
          <div className={styles.errorMessage}>{errors.title}</div>
        )}
      </label>
      <label>
        <textarea
          className={clsx(styles.input, errors.description ? styles.error : '')}
          name="description"
          placeholder="Введите описание дела"
          onChange={handleOnInputChange}
          value={todo.description}
          autoComplete="off"
        />
        {errors.description && (
          <div className={styles.errorMessage}>{errors.description}</div>
        )}
        <span className={styles.textCounter}>
          {todo.description.length} / 250
        </span>
      </label>
      <button
        type="button"
        className={clsx(
          styles.button,
          styles.button__add,
          !isFormValid ? styles.button__disabled : ''
        )}
        onClick={handleOnSubmit}
        disabled={!isFormValid}
      >
        Добавить
      </button>
    </>
  );
}
