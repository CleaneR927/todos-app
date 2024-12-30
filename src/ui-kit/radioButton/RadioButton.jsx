import styles from './radioButton.module.css';

export const RadioButton = ({ priority, handlePriorityChange }) => {
  return (
    <fieldset className={styles.radioContainer}>
      <label>
        <input
          className={styles.radioItem}
          type="radio"
          value="Важно"
          checked={priority === 'Важно'}
          onChange={handlePriorityChange}
        />
        Важно
      </label>
      <label>
        <input
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
