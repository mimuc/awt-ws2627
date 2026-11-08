import React from 'react';
import './App.css';
import Counter from './Counter'
const App: React.FC = () => {
  return (
    <div className="app">
      <div className="header"><h1>Counter - React</h1></div>
      <Counter />
    </div>
  );
}
export default App;
