import React, { useState, useEffect } from 'react';
import styles from './addTodo.module.css';
import clsx from 'clsx';
import { CgMathPlus } from 'react-icons/cg';

export const AddTodo = ({ openModal }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 650);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (typeof openModal === 'function') {
      openModal('create');
    } else {
      console.error('openModal is not a function');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className={clsx(styles.button, isSmallScreen ? styles.small : '')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Добавить новое дело"
    >
      {isSmallScreen ? <CgMathPlus /> : 'Add Todo'}
    </button>
  );
};
