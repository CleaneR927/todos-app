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

  return (
    <button
      type="button"
      className={clsx(styles.button, isSmallScreen ? styles.small : '')}
      onClick={() => openModal('create')}
      aria-label="Добавить новое дело"
    >
      {isSmallScreen ? <CgMathPlus /> : 'Добавить новое дело'}
    </button>
  );
};
