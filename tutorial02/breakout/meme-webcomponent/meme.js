// <meme-image> – a meme as a Web Component.
// Breakout #1 basis: notice how every caption needs its own copy of the code.

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
          position: absolute; left: 0; right: 0; margin: 0; padding: 0 .4em;
          font: 900 2.2em Impact, 'Arial Black', sans-serif; text-transform: uppercase;
          text-align: center; color: #fff; -webkit-text-stroke: 1.5px #000;
        }
        .top { top: .3em; }
        .bottom { bottom: .3em; }
        .caption[hidden] { display: none; }
        .handle {
          display: none; position: absolute; top: -.9em; left: 50%; transform: translateX(-50%);
          font-size: .5em; -webkit-text-stroke: 0; color: #000; background: #fff;
          border-radius: 4px; padding: 0 .3em; cursor: grab;
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

    // Duplicate code: the same drag wiring, once per caption.
    this._makeDraggable(this._top);
    this._makeDraggable(this._bottom);
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

  _makeDraggable(cap) {
    const handle = cap.querySelector('.handle');
    handle.addEventListener('pointerdown', (down) => {
      if (!this.hasAttribute('editable')) return;
      down.preventDefault();
      handle.setPointerCapture(down.pointerId);
      const box = this.getBoundingClientRect();

      const move = (e) => {
        const x = ((e.clientX - box.left) / box.width) * 100;
        const y = ((e.clientY - box.top) / box.height) * 100;
        cap.style.top = `${y}%`;
        cap.style.bottom = 'auto';
        cap.style.left = `${x}%`;
        cap.style.right = 'auto';
        cap.style.transform = 'translate(-50%, 0)';
        cap.style.width = 'max-content';
        cap.style.maxWidth = '90%';
        this.dispatchEvent(new CustomEvent('captionmove', {
          bubbles: true, composed: true,
          detail: { caption: cap.dataset.name, x: Math.round(x), y: Math.round(y) },
        }));
      };
      const up = () => {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  }
}

customElements.define('meme-image', MemeImage);

document.addEventListener('captionmove', (e) => console.log('captionmove', e.detail));
