import React, { useEffect } from 'react';
import styles from './modalForm.module.css';
import clsx from 'clsx';
import { useTodoValidation } from '../../hooks/useTodoValidation';

export function ModalFormChange({ todo, onEdit, onClose }) {
  const {
    todo: updatedTodo,
    errors,
    isFormValid,
    handleOnInputChange,
    setTodo
  } = useTodoValidation();

  useEffect(() => {
    setTodo({
      title: todo.title || '',
      description: todo.description || ''
    });
  }, [todo, setTodo]);

  const handleOnSubmit = () => {
    if (todo && isFormValid) {
      onEdit({ ...updatedTodo, id: todo.id });
      onClose();
    }
  };

  return (
    <>
      <h2 className={styles.title}>Изменить дело</h2>
      <label>
        <input
          className={clsx(styles.input, errors.title ? styles.error : '')}
          type="text"
          name="title"
          value={updatedTodo.title || ''}
          onChange={handleOnInputChange}
          placeholder="Введите название дела"
        />
        {errors.title && (
          <div className={styles.errorMessage}>{errors.title}</div>
        )}
      </label>
      <label>
        <textarea
          className={clsx(styles.input, errors.description ? styles.error : '')}
          name="description"
          value={updatedTodo.description || ''}
          onChange={handleOnInputChange}
          placeholder="Введите описание дела"
        />
        {errors.description && (
          <div className={styles.errorMessage}>{errors.description}</div>
        )}
        <span className={styles.textCounter}>
          {updatedTodo.description.length} / 250
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
        Сохранить изменения
      </button>
    </>
  );
}
