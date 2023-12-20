import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
   <>
   {/* je vais chercher mes composants principaux */}
    <Header />
    <TodoList />
   </>
  );
}

export default App;
