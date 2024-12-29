import styles from './header.module.css';
import { ThemeSwitchButton } from './themeSwitchButton/ThemeSwitchButton';
import { AddTodo } from '../../ui-kit/addTodo/AddTodo';
import { HappyNewYear } from '../../ui-kit/happyNewYear/HappyNewYear';

export function HeaderPage({ openModal }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>TodosApp</h2>
      <AddTodo openModal={openModal} />
      <ThemeSwitchButton />
      <HappyNewYear />
    </header>
  );
}
