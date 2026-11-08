import { useState } from 'react';

// Last week: <meme-caption> with attributes, observedAttributes and
// attributeChangedCallback. Here: props in, state for the position, and React
// re-renders whenever the position changes.
export default function MemeCaption({ position, x, y, children }) {
  const [pos, setPos] = useState({ x, y });
  const placed = pos.x != null && pos.y != null;
  const style = placed ? { left: `${pos.x}%`, top: `${pos.y}%` } : undefined;

  function startDrag(down) {
    down.preventDefault();
    const handle = down.currentTarget;
    handle.setPointerCapture(down.pointerId);
    const box = handle.closest('.meme').getBoundingClientRect();

    const move = (e) => setPos({
      x: Math.round(((e.clientX - box.left) / box.width) * 100),
      y: Math.round(((e.clientY - box.top) / box.height) * 100),
    });
    const stop = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', stop);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', stop);
  }

  const className = ['caption', placed ? 'placed' : position].filter(Boolean).join(' ');
  return (
    <p className={className} style={style}>
      <span className="handle" aria-hidden="true" onPointerDown={startDrag}>✥</span>
      {children}
    </p>
  );
}
