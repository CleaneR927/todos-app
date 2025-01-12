import { useEffect, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import clsx from 'clsx';
import { CgChevronDoubleRightO } from 'react-icons/cg';
import styles from './themeSwitchButton.module.css';

export function ThemeSwitchButton() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const { trapRef } = useFocusTrap(true);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSwitchTheme();
    }
  };

  return (
    <div
      className={clsx(
        styles.switch__container,
        isDarkTheme ? styles.switch__container_active : ''
      )}
      ref={trapRef}
    >
      <CgChevronDoubleRightO
        role="button"
        tabIndex={0}
        className={clsx(
          styles.switch__button,
          isDarkTheme ? styles.switch__button_active : ''
        )}
        onClick={handleSwitchTheme}
        onKeyDown={handleKeyDown}
        aria-label={
          isDarkTheme ? 'Сменить на светлую тему' : 'Сменить на темную тему'
        }
        style={{
          transform: isDarkTheme
            ? 'translateX(30px) rotate(180deg)'
            : 'translateX(0) rotate(0deg)'
        }}
      ></CgChevronDoubleRightO>
    </div>
  );
}
