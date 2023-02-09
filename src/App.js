import './App.css';
import Login from './Login';
import Registration from './Registration';

function App() {
  return (
    <div className="App">
      <header>
        <h1>glab Identity GUI</h1>
      </header>
      <section>
        <Login></Login>
        <Registration></Registration>
      </section>
    </div>
  );
}

export default App;
