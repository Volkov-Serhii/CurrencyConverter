import logo from './logo.svg';
import './App.css';
import Header from '../src/components/UI/Header'
import Converter from './components/Pages/Converter';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Converter></Converter>
    </div>
  );
}

export default App;
