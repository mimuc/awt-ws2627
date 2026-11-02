import { useState, useRef, useEffect, useCallback } from 'react';
import './ResettableTimer.css';

function format(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${m}:${s}.${cs}`;
}

export default function Timer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Time accumulated before the current run, and when the current run started.
  const baseRef = useRef(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    let frame;
    const tick = () => {
      setElapsed(baseRef.current + (Date.now() - startRef.current));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const start = useCallback(() => {
    startRef.current = Date.now();
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    baseRef.current += Date.now() - startRef.current;
    setElapsed(baseRef.current);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    baseRef.current = 0;
    startRef.current = Date.now();
    setElapsed(0);
  }, []);

  return (
    <div className="resettable-timer">
      <div className="resettable-timer__time" role="timer" aria-live="off">{format(elapsed)}</div>
      <div className="resettable-timer__buttons">
        {running
          ? <button className="resettable-timer__btn" onClick={pause}>Pause</button>
          : <button className="resettable-timer__btn" onClick={start}>{elapsed ? 'Resume' : 'Start'}</button>}
        <button className="resettable-timer__btn" onClick={reset} disabled={!running && elapsed === 0}>
          Reset
        </button>
      </div>
    </div>
  );
}