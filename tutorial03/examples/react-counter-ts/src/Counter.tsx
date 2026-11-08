import React, { useState } from 'react';
import './Counter.css';

// State hook: here the state is an object. Unlike this.setState in a class,
// the setter does not merge – it replaces the whole object.
const Counter: React.FC = () => {
  const [state, setState] = useState({ count: 0 })
  const inc = () => setState({ count: state.count + 1 })
  const dec = () => setState({ count: state.count - 1 })
  return (
    <div className="counter"><span>{ state.count }</span><div>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div></div>
  )}
export default Counter
