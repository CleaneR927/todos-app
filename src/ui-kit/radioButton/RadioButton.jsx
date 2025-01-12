import styles from './radioButton.module.css';

export const RadioButton = ({ priority, handlePriorityChange }) => {
  return (
    <fieldset className={styles.radioContainer}>
      <label htmlFor="priority-important">
        <input
          id="priority-important"
          className={styles.radioItem}
          type="radio"
          value="Важно"
          checked={priority === 'Важно'}
          onChange={handlePriorityChange}
        />
        Важно
      </label>
      <label htmlFor="priority-not-important">
        <input
          id="priority-not-important"
          className={styles.radioItem}
          type="radio"
          value="Не важно"
          checked={priority === 'Не важно'}
          onChange={handlePriorityChange}
        />
        Не важно
      </label>
    </fieldset>
  );
};
