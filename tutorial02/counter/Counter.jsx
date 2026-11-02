import { useState } from 'react';

export function Counter () {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{ count }</span>
      <div>
      <button onClick={
        () => setCount(c => c + 1)
      }>+</button>
      <button onClick={
        () => setCount(c => c - 1)
      }>-</button>
    </div>
  </div>);
};
