import styles from './header.module.css';
import { ThemeSwitchButton } from './themeSwitchButton/ThemeSwitchButton';
import { AddTodo } from '../../ui-kit/addTodo/AddTodo';

export function HeaderPage({ openModal }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>TodosApp</h2>
      <AddTodo openModal={openModal} />
      <ThemeSwitchButton />
    </header>
  );
}
