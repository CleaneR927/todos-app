import React, { useEffect, useState } from 'react';
import { Todo } from '../Todo/Todo';
import { Modal } from '../Modal/Modal';
import styles from './TodoLists.module.css';

export function TodoLists() {
  const [todos, setTodos] = useState(() => {
    const localSorage = localStorage.getItem('todos');
    let parsedTodos = [];
    try {
      parsedTodos = localSorage ? JSON.parse(localSorage) : [];
    } catch (error) {
      console.error('Ошибка при парсинге todos из localStorage:', error);
    }
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleOnCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleOnAdd = () => {
    if (newTodo.title === '' || newTodo.description === '') {
      alert('Заполните все поля');
      return;
    }
    setTodos([
      ...todos,
      {
        id: Math.random(),
        title: newTodo.title,
        description: newTodo.description,
        completed: false
      }
    ]);
    setNewTodo({ title: '', description: '' });
    handleOnCloseModal();
  };

  const handleOnDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleOnInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnCloseModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
      setIsAnimating(false);
    }, 200);
  };

  const handleOnOpenModal = () => {
    setIsModalOpen(true);
    setIsExiting(false);
    setTimeout(() => setIsAnimating(true), 0);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список моих дел</h2>
      <button
        type="button"
        className={styles.button}
        onClick={handleOnOpenModal}
        aria-label="Добавить новое дело"
      >
        Добавить новое дело
      </button>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleOnCheck={handleOnCheck}
            handleOnDelete={handleOnDelete}
          />
        );
      })}
      {isModalOpen && (
        <Modal
          handleOnInputChange={handleOnInputChange}
          handleOnAdd={handleOnAdd}
          handleOnCloseModal={handleOnCloseModal}
          isAnimating={isAnimating}
          isExiting={isExiting}
        />
      )}
    </div>
  );
}
