import { HeaderPage } from './header/Header';
import { TodosList } from './todoLists/TodosList';
import { Footer } from './footer/Footer';
import '../index.css';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <HeaderPage />
      <TodosList />
      <Footer />
    </div>
  );
}

export default App;
