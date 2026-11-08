import { useState } from 'react';
import './Counter.css';

// Each component is a function that returns JSX.
// useState gives the component its own memory: the current value and a setter.
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <span>{count}</span>
      <div>
        <button onClick={
          () => setCount((c) => c + 1)
        }>+</button>
        <button onClick={
          () => setCount((c) => c - 1)
        }>-</button>
      </div>
    </div>);
}
