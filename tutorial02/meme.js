
// Relative template names resolve against this base; absolute URLs are used as-is.
const MEME_BASE = 'https://imgflip.com/s/meme/';

class MemeImage extends HTMLElement {
  // HTML attribute names are case-insensitive, so they must be listed lowercase.
  static observedAttributes = ['captiontop', 'captionbottom', 'memetemplateurl', 'editable'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: inline-block; position: relative; max-width: 100%; user-select: none; }
        img { display: block; max-width: 100%; pointer-events: none; }
        .caption {
          position: absolute; left: 0; right: 0; margin: 0; padding: 0 .5em;
          box-sizing: border-box;
          text-align: center; text-transform: uppercase; word-wrap: break-word;
          font: 2.2em Impact, "Anton", "Arial Narrow Bold", sans-serif;
          color: #fff; letter-spacing: .02em;
          -webkit-text-stroke: 2px #000; paint-order: stroke fill;
          text-shadow: 0 0 3px #000;
        }
        .top { top: .3em; }
        .bottom { bottom: .3em; }
        .caption[hidden] { display: none; }

        .handle {
          display: none; position: absolute; top: -12px; left: 50%;
          width: 24px; height: 24px; margin-left: -12px;
          border-radius: 50%; background: #3b82f6; color: #fff;
          font: 14px/24px system-ui, sans-serif; text-align: center;
          -webkit-text-stroke: 0; text-shadow: none;
          cursor: grab; touch-action: none; box-shadow: 0 1px 3px rgba(0,0,0,.4);
        }
        .handle:active { cursor: grabbing; }
        :host([editable]) .caption { outline: 2px dashed rgba(255,255,255,.8); outline-offset: 2px; }
        :host([editable]) .handle { display: block; }
      </style>
      <img part="image" alt="">
      <p class="caption top" part="caption caption-top" data-name="top">
        <span class="handle" part="handle" aria-hidden="true">✥</span><span class="text"></span>
      </p>
      <p class="caption bottom" part="caption caption-bottom" data-name="bottom">
        <span class="handle" part="handle" aria-hidden="true">✥</span><span class="text"></span>
      </p>`;

    this._img = this.shadowRoot.querySelector('img');
    this._top = this.shadowRoot.querySelector('.top');
    this._bottom = this.shadowRoot.querySelector('.bottom');

    for (const cap of [this._top, this._bottom]) {
      cap.querySelector('.handle').addEventListener('pointerdown', e => this._startDrag(e, cap));
    }
  }

  attributeChangedCallback(name, _old, value) {
    switch (name) {
      case 'captiontop':    this._setText(this._top, value); break;
      case 'captionbottom': this._setText(this._bottom, value); break;
      case 'memetemplateurl':
        this._img.src = value ? new URL(value, MEME_BASE).href : '';
        break;
    }
    this._img.alt = [this.getAttribute('captiontop'), this.getAttribute('captionbottom')]
      .filter(Boolean).join(' ');
  }

  _setText(cap, value) {
    cap.querySelector('.text').textContent = value ?? '';
    cap.hidden = !value;
  }

  _startDrag(e, cap) {
    if (!this.hasAttribute('editable')) return;
    e.preventDefault();
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);

    const host = this.getBoundingClientRect();
    const rect = cap.getBoundingClientRect();
    const offX = e.clientX - rect.left;
    const offY = e.clientY - rect.top;

    // Switch from CSS default placement to explicit percentage placement.
    Object.assign(cap.style, {
      width: `${rect.width / host.width * 100}%`,
      left: `${(rect.left - host.left) / host.width * 100}%`,
      top: `${(rect.top - host.top) / host.height * 100}%`,
      right: 'auto', bottom: 'auto',
    });

    const move = ev => {
      const h = this.getBoundingClientRect();
      const x = Math.min(Math.max(ev.clientX - h.left - offX, 0), h.width - rect.width);
      const y = Math.min(Math.max(ev.clientY - h.top - offY, 0), h.height - rect.height);
      cap.style.left = `${x / h.width * 100}%`;
      cap.style.top = `${y / h.height * 100}%`;
    };

    const end = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', end);
      handle.removeEventListener('pointercancel', end);
      this.dispatchEvent(new CustomEvent('captionmove', {
        bubbles: true, composed: true,
        detail: {
          caption: cap.dataset.name,
          x: parseFloat(cap.style.left),   // % of image width
          y: parseFloat(cap.style.top),    // % of image height
        },
      }));
    };

    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }
}

customElements.define('meme-image', MemeImage);

document.addEventListener('captionmove', e => console.log('captionmove', e.detail));