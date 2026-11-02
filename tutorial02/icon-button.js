const ICONS = {
  checkmark: '<polyline points="4 12 10 18 20 6"/>',
  cross: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
};

class ItemButton extends HTMLElement {
  static observedAttributes = ['icon', 'disabled'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          display: inline-flex; align-items: center; gap: .4em;
          font: inherit; padding: .5em 1em; cursor: pointer;
          border: 1px solid #ccc; border-radius: 6px; background: #fff; color: #222;
        }
        button:hover { background: #f3f3f3; }
        button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        button:disabled { opacity: .5; cursor: not-allowed; }
        svg { width: 1em; height: 1em; fill: none; stroke: currentColor;
              stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        svg:empty { display: none; }
        :host([icon="checkmark"]) button { color: #15803d; }
        :host([icon="cross"]) button { color: #b91c1c; }
      </style>
      <button part="button" type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true" part="icon"></svg>
        <slot></slot>
      </button>`;
    this._btn = this.shadowRoot.querySelector('button');
    this._svg = this.shadowRoot.querySelector('svg');
  }

  attributeChangedCallback(name, _old, value) {
    if (name === 'icon') this._svg.innerHTML = ICONS[value] ?? '';
    if (name === 'disabled') this._btn.disabled = value !== null;
  }
}

customElements.define('item-button', ItemButton);

// usage example
document.querySelectorAll('item-button').forEach(b =>
  b.addEventListener('click', () => console.log(b.textContent.trim(), 'clicked'))
);