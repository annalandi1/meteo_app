import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MyMain from './components/MyMain';
import MyNav from './components/MyHeader';


function App() {
  return (
    <div className="App">
      <header >
         <MyNav/>
      </header>
      <main>
       
        <MyMain/>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
