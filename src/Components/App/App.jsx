import { HeaderPage } from '../Header/Header';
import { TodoLists } from '../TodoLists/TodoLists';
import { Footer } from '../Footer/Footer';
import '../../index.css';
import styles from './App.module.css';

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

