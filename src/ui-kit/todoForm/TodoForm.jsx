import React, { useEffect } from 'react';
import styles from './todoForm.module.css';
import clsx from 'clsx';
import { useTodoValidation } from '../../hooks/useTodoValidation';
import { RadioButton } from '../radioButton/RadioButton';

export function TodoForm({ todo, onSubmit, onClose, isEditing }) {
  const {
    todo: updatedTodo,
    errors,
    isFormValid,
    handleOnInputChange,
    setTodo
  } = useTodoValidation();

  useEffect(() => {
    if (isEditing && todo) {
      setTodo({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'Не важно',
        completed: todo.completed
      });
    } else {
      setTodo({ title: '', description: '', priority: 'Не важно' });
    }
  }, [todo, setTodo, isEditing]);

  const handlePriorityChange = (e) => {
    setTodo((prevState) => ({
      ...prevState,
      priority: e.target.value
    }));
  };

  const handleOnSubmit = () => {
    if (isEditing) {
      onSubmit({ ...updatedTodo, id: todo.id });
    } else {
      onSubmit(updatedTodo);
    }
    onClose();
  };

  return (
    <>
      <h2 className={styles.title} id="modal-title">
        {isEditing ? 'Изменить дело' : 'Добавить новое дело'}
      </h2>
      <label htmlFor="title">
        <input
          id="title"
          className={clsx(styles.input, errors.title ? styles.error : '')}
          type="text"
          name="title"
          placeholder="Введите название дела"
          onChange={handleOnInputChange}
          value={updatedTodo.title || ''}
          aria-required="true"
          aria-invalid={errors.title ? 'true' : 'false'}
          autoComplete="off"
        />
        {errors.title && (
          <div className={styles.errorMessage} role="alert">
            {errors.title}
          </div>
        )}
      </label>
      <label htmlFor="description">
        <textarea
          id="description"
          className={clsx(styles.input, errors.description ? styles.error : '')}
          name="description"
          placeholder="Введите описание дела"
          onChange={handleOnInputChange}
          value={updatedTodo.description || ''}
          aria-required="true"
          aria-invalid={errors.description ? 'true' : 'false'}
          maxLength="250"
        />
        {errors.description && (
          <div className={styles.errorMessage} role="alert">
            {errors.description}
          </div>
        )}
        <span className={styles.textCounter}>
          {updatedTodo.description.length} / 250
        </span>
      </label>
      <RadioButton
        priority={updatedTodo.priority}
        handlePriorityChange={handlePriorityChange}
      />
      <button
        type="button"
        className={clsx(
          styles.button,
          !isFormValid ? styles.button__disabled : ''
        )}
        onClick={handleOnSubmit}
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
        aria-label={isEditing ? 'Сохранить изменения' : 'Добавить дело'}
        tabIndex={0}
      >
        {isEditing ? 'Сохранить изменения' : 'Добавить дело'}
      </button>
    </>
  );
}
