import React, { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Todo } from '../todo/Todo';
import { Modal } from '../modal/Modal';
import { HeaderPage } from '../header/Header';
import { TodoForm } from '../../ui-kit/todoForm/TodoForm';
import { SearchComponent } from '../../ui-kit/searchComponent/SearchComponent';
import { AcceptDeleteComponent } from '../../ui-kit/acceptDeleteComponent/AcceptDeleteComponent';
import styles from './todosList.module.css';

export function TodosList() {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [formAction, setFormAction] = useState('create');
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

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
      {
        id: uuidv4(),
        ...newTodo,
        completed: false,
        createdAt: new Date().toISOString()
      },
      ...prevTodos
    ]);
  };

  const handleOnEdit = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...todo, ...updatedTodo, createdAt: todo.createdAt };
        }
        return todo;
      })
    );
  };

  const handleOnDelete = (id) => {
    try {
      setTodos(todos.filter((todo) => todo.id !== id));
      setIsDeleteConfirmation(false);
      setIsModalOpen(false);
      toast.success('Задача успешно удалена!');
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      toast.error('Не удалось удалить задачу. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleOnOpenModal = (action, todo = null) => {
    if (isExiting) return;
    if (action !== 'delete') {
      setIsDeleteConfirmation(false);
    }
    if (action === 'delete') {
      setIsDeleteConfirmation(true);
      setCurrentTodo(todo);
    } else {
      setFormAction(action);
      setCurrentTodo(todo);
    }
    setIsModalOpen(true);
    setIsExiting(false);
    setTimeout(() => setIsAnimating(true), 0);
  };

  const handleOnCloseModal = () => {
    if (isDeleteConfirmation) {
      setIsExiting(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setCurrentTodo(null);
        setIsExiting(false);
        setIsAnimating(false);
      }, 200);
    } else {
      setIsExiting(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setCurrentTodo(null);
        setIsExiting(false);
        setIsAnimating(false);
      }, 200);
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div className={styles.container}>
      <HeaderPage openModal={handleOnOpenModal} />
      <h2 className={styles.title}>Список моих дел</h2>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleOnCheck={handleOnCheck}
          handleOnDelete={() => handleOnOpenModal('delete', todo)}
          handleOnEdit={() => handleOnOpenModal('change', todo)}
        />
      ))}
      {isModalOpen && (
        <Modal
          onClose={handleOnCloseModal}
          isAnimating={isAnimating}
          isExiting={isExiting}
        >
          {isDeleteConfirmation ? (
            <AcceptDeleteComponent
              todo={currentTodo}
              onDelete={handleOnDelete}
              onClose={handleOnCloseModal}
            />
          ) : (
            <TodoForm
              todo={formAction === 'change' ? currentTodo : null}
              onSubmit={formAction === 'change' ? handleOnEdit : handleOnAdd}
              onClose={handleOnCloseModal}
              isEditing={formAction === 'change'}
            />
          )}
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
