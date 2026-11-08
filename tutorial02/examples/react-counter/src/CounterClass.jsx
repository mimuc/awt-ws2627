import { Component } from 'react';
import './Counter.css';

// The same counter as a class component – the older style you will still
// find in existing code bases. Not used by App.jsx; compare it with Counter.jsx.
export class Counter extends Component {
  // class components keep their state in this.state
  state = { count: 0 };
  inc = () => {
    this.setState({ count: this.state.count + 1 }) };
  dec = () => {
    this.setState({ count: this.state.count - 1 }) };
  render() {
    return (
      <div className="counter">
        <span>{ this.state.count }</span>
        <div>
          <button onClick={this.inc}>+</button>
          <button onClick={this.dec}>-</button>
        </div>
      </div>
    );
  }
}
