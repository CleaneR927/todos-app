import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
import Pagination from '../../ui-kit/Pagination/Pagination';

const ITEMS_PER_PAGE = 5;

export function TodosList() {
  const [todos, setTodos] = useState(() => {
    const localSorage = localStorage.getItem('todos');
    try {
      return localSorage ? JSON.parse(localSorage) : [];
    } catch (error) {
      console.error('Ошибка при парсинге todos из localStorage:', error);
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOnCheck = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleOnAdd = useCallback((newTodo) => {
    setTodos((prevTodos) => [
      {
        id: uuidv4(),
        ...newTodo,
        completed: false,
        createdAt: new Date().toISOString()
      },
      ...prevTodos
    ]);
  }, []);

  const handleOnEdit = useCallback((updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, ...updatedTodo, createdAt: todo.createdAt }
          : todo
      )
    );
  }, []);

  const handleOnDelete = useCallback((id) => {
    try {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
      setIsDeleteConfirmation(false);
      setIsModalOpen(false);
      toast.success('Задача успешно удалена!');
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      toast.error('Не удалось удалить задачу. Пожалуйста, попробуйте еще раз.');
    }
  }, []);

  const handleOnOpenModal = useCallback(
    (action, todo = null) => {
      if (!isExiting) {
        setIsDeleteConfirmation(action === 'delete');
        setCurrentTodo(todo);
        setFormAction(action === 'delete' ? 'delete' : action);
        setIsModalOpen(true);
        setIsExiting(false);
        setTimeout(() => setIsAnimating(true), 0);
      }
    },
    [isExiting]
  );

  const handleOnCloseModal = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setCurrentTodo(null);
      setIsExiting(false);
      setIsAnimating(false);
    }, 200);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTodos, currentPage]);

  return (
    <div className={styles.container}>
      <HeaderPage openModal={handleOnOpenModal} />
      <h2 className={styles.title}>Список моих дел</h2>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.todosList}>
        {paginatedTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleOnCheck={handleOnCheck}
            handleOnDelete={() => handleOnOpenModal('delete', todo)}
            handleOnEdit={() => handleOnOpenModal('change', todo)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
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
