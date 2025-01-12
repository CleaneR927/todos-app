import React from 'react';
import styles from './searchComponent.module.css';
import { CgCloseO } from 'react-icons/cg';

export function SearchComponent({ searchTerm, setSearchTerm }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {searchTerm && (
        <CgCloseO
          className={styles.closeIcon}
          onClick={() => setSearchTerm('')}
          onKeyDown={handleKeyPress}
          aria-label="Очистить поиск"
          tabIndex={0}
        />
      )}
    </div>
  );
}
