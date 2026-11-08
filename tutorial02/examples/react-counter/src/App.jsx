import Counter from './Counter';
import './App.css';

// Now you can use your component like a "regular" HTML element.
function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Counter - React</h1>
      </div>
      <Counter />
    </div>);
}

export default App;
