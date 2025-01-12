import { useEffect, useRef } from 'react';

export const useFocusTrap = (isOpen) => {
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null); // ссылки на первый и последний фокусируемые элементы в затянутой области.
  const trapRef = useRef(null); // ссылка на элемент, к которому применяется затмение фокуса.

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = trapRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [contenteditable=true]' // Записываются все фокусируемые элементы в переменную focusableElements.
    );
    firstFocusableRef.current = focusableElements[0];
    lastFocusableRef.current = focusableElements[focusableElements.length - 1]; // Первый и последний фокусируемый элемент сохраняются в рефах.

    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus(); // Если есть первый фокусируемый элемент, ему устанавливается фокус
    }

    const handleFocusTrap = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current.focus();
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);

    return () => {
      document.removeEventListener('keydown', handleFocusTrap); // Когда хук размонтируется или isOpen изменится, обработчик события удаляется.
    };
  }, [isOpen]);

  return { trapRef, firstFocusableRef, lastFocusableRef };
};

/* 
Хук useFocusTrap можно использовать в компонентах, чтобы заставить фокусироваться на определенной области, 
когда эта область открыта. Например, в модальных диалогах это улучшает доступность для пользователей, 
которые полагаются на клавиатуру для навигации по интерфейсу. В целом, этот хук легко интегрируется и 
использует стандартные функции для обработки событий в пределах области, 
что делает его мощным инструментом для управления фокусом в приложениях React.
*/
