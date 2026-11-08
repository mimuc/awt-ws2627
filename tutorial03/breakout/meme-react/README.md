# Recap Breakout – solution: last week's meme in React

`npm install && npm run dev`

| Web Components (last week) | React (here) |
|---|---|
| `<slot>` | `children` |
| attributes + `observedAttributes` | props |
| `attributeChangedCallback` → update the DOM by hand | state changes → React re-renders |
| `customElements.define('meme-caption', …)` | `import MemeCaption from './MemeCaption'` |
| CSS custom properties across the shadow boundary | a parent class (`.editable`) |
