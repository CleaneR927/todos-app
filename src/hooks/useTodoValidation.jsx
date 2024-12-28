import { useState } from 'react';

export const useTodoValidation = () => {
  const [todo, setTodo] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));

    if (name === 'title') {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          title: 'Поле обязательно для заполнения.'
        }));
      } else if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          title: 'Название должно содержать не менее 3 символов.'
        }));
      } else {
        setErrors((prev) => ({ ...prev, title: '' }));
      }
    }

    if (name === 'description') {
      if (value.length > 250) {
        setErrors((prev) => ({
          ...prev,
          description: 'Описание не может превышать 250 символов.'
        }));
      } else {
        setErrors((prev) => ({ ...prev, description: '' }));
      }
    }
  };

  const isFormValid =
    todo.title.trim().length >= 3 && todo.description.length <= 250;

  return {
    todo,
    errors,
    isFormValid,
    handleOnInputChange,
    setTodo
  };
};
