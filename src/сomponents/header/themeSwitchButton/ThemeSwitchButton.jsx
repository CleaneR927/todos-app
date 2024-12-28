import clsx from 'clsx';
import styles from './themeSwitchButton.module.css';
import { CgChevronDoubleRightO } from 'react-icons/cg';
import { useEffect, useState } from 'react';

export function ThemeSwitchButton() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? 'dark' : 'light'
    );
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const handleSwitchTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={clsx(
        styles.switch__container,
        isDarkTheme ? styles.switch__container_active : ''
      )}
    >
      <CgChevronDoubleRightO
        type="button"
        className={clsx(
          styles.switch__button,
          isDarkTheme ? styles.switch__button_active : ''
        )}
        onClick={handleSwitchTheme}
        style={{
          transform: isDarkTheme
            ? 'translateX(30px) rotate(180deg)'
            : 'translateX(0) rotate(0deg)'
        }}
      ></CgChevronDoubleRightO>
    </div>
  );
}
