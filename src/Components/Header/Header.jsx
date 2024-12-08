import styles from './Header.module.css';

export function HeaderPage() {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>TodosApp</h2>
    </header>
  );
}
