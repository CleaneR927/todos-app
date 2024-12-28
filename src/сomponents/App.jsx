import { HeaderPage } from './header/Header';
import { TodoLists } from './todoLists/TodoLists';
import { Footer } from './footer/Footer';
import '../index.css';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <HeaderPage />
      <TodoLists />
      <Footer />
    </div>
  );
}

export default App;
