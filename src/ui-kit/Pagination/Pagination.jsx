import React from 'react';
import styles from './pagination.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage
}) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Предыдущая
      </button>
      <span
        className={styles.pageLists}
      >{`Страница ${currentPage} из ${totalPages}`}</span>
      <button
        className={styles.button}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Следующая
      </button>
    </div>
  );
};

export default Pagination;
