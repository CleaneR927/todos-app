import React, { useEffect, useState } from 'react';
import styles from './modalForm.module.css';
import clsx from 'clsx';
import { useTodoValidation } from '../../hooks/useTodoValidation';
import { RadioButton } from '../radioButton/RadioButton';

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
      description: todo.description || '',
      priority: todo.priority || 'Не важно',
      completed: todo.completed
    });
  }, [todo, setTodo]);

  const handlePriorityChange = (e) => {
    setTodo((prevState) => ({
      ...prevState,
      priority: e.target.value
    }));
  };

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
          placeholder="Введите название дела"
          onChange={handleOnInputChange}
          value={updatedTodo.title || ''}
        />
        {errors.title && (
          <div className={styles.errorMessage}>{errors.title}</div>
        )}
      </label>
      <label>
        <textarea
          className={clsx(styles.input, errors.description ? styles.error : '')}
          type="text"
          name="description"
          placeholder="Введите описание дела"
          onChange={handleOnInputChange}
          value={updatedTodo.description || ''}
        />
        {errors.description && (
          <div className={styles.errorMessage}>{errors.description}</div>
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
