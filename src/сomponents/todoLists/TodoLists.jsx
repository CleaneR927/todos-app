import React, { useEffect, useState } from 'react';
import { Todo } from '../todo/Todo';
import { Modal } from '../modal/Modal';
import styles from './todoLists.module.css';
import { ModalFormCreate } from '../../ui-kit/modal/ModalFormCreate';
import { ModalFormChange } from '../../ui-kit/modal/ModalFormChange';
import { HeaderPage } from '../header/Header';

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
  const [formAction, setFormAction] = useState('create');
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleOnCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleOnAdd = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random(), ...newTodo, completed: false }
    ]);
  };

  const handleOnEdit = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleOnDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleOnOpenModal = (action, todo = null) => {
    setFormAction(action);
    setCurrentTodo(todo);
    setIsModalOpen(true);
    setIsExiting(false);
    setTimeout(() => setIsAnimating(true), 0);
  };

  const handleOnCloseModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setCurrentTodo(null);
      setIsExiting(false);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className={styles.container}>
      <HeaderPage openModal={handleOnOpenModal} />
      <h2 className={styles.title}>Список моих дел</h2>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleOnCheck={handleOnCheck}
            handleOnDelete={handleOnDelete}
            handleOnEdit={() => handleOnOpenModal('change', todo)}
          />
        );
      })}
      {isModalOpen && (
        <Modal
          onClose={handleOnCloseModal}
          isAnimating={isAnimating}
          isExiting={isExiting}
        >
          {formAction === 'create' ? (
            <ModalFormCreate onAdd={handleOnAdd} onClose={handleOnCloseModal} />
          ) : (
            <ModalFormChange
              todo={currentTodo}
              onEdit={handleOnEdit}
              onClose={handleOnCloseModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
