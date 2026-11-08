// Breakout #1 – solution: the caption becomes its own component.
//
//   <meme-image editable memeTemplateUrl="…">
//     <meme-caption position="top">ONE DOES NOT SIMPLY</meme-caption>
//     <meme-caption x="30" y="22">A THIRD ONE</meme-caption>
//   </meme-image>

const MEME_BASE = 'https://imgflip.com/s/meme/';

class MemeImage extends HTMLElement {
  static observedAttributes = ['memetemplateurl'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: inline-block; position: relative; max-width: 100%; user-select: none; }
        /* editable switches the captions' handles on. Custom properties
           inherit across the shadow boundary into the slotted captions. */
        :host([editable]) { --caption-outline: 2px dashed rgba(255,255,255,.8); --handle-display: block; }
        img { display: block; max-width: 100%; pointer-events: none; }
      </style>
      <img part="image" alt="">
      <slot></slot>`;    // captions are shown here
    this._img = this.shadowRoot.querySelector('img');
  }

  attributeChangedCallback(_name, _old, value) {
    this._img.src = value ? new URL(value, MEME_BASE).href : '';
  }
}

class MemeCaption extends HTMLElement {
  static observedAttributes = ['x', 'y'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          position: absolute; left: 0; right: 0; margin: 0; padding: 0 .4em;
          font: 900 2.2em Impact, 'Arial Black', sans-serif; text-transform: uppercase;
          text-align: center; color: #fff; -webkit-text-stroke: 1.5px #000;
          outline: var(--caption-outline, none); outline-offset: 2px;
        }
        :host([position="top"])    { top: .3em; }
        :host([position="bottom"]) { bottom: .3em; }
        .handle {
          display: var(--handle-display, none); position: absolute; top: -.9em; left: 50%;
          transform: translateX(-50%); font-size: .5em; -webkit-text-stroke: 0; color: #000;
          background: #fff; border-radius: 4px; padding: 0 .3em; cursor: grab;
        }
        .handle:active { cursor: grabbing; }
      </style>
      <span class="handle" aria-hidden="true">✥</span>
      <slot></slot>`;    // the caption text

    // Drag logic – written once, for every caption.
    const handle = this.shadowRoot.querySelector('.handle');
    handle.addEventListener('pointerdown', (down) => {
      down.preventDefault();
      handle.setPointerCapture(down.pointerId);
      const box = this.parentElement.getBoundingClientRect();
      const move = (e) => {
        // Writing back into the attributes keeps the HTML in sync with what you see.
        this.setAttribute('x', Math.round(((e.clientX - box.left) / box.width) * 100));
        this.setAttribute('y', Math.round(((e.clientY - box.top) / box.height) * 100));
      };
      const up = () => {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  }

  attributeChangedCallback() {
    // x / y → position in % of the image
    const x = this.getAttribute('x');
    const y = this.getAttribute('y');
    if (x === null || y === null) return;
    Object.assign(this.style, {
      left: `${x}%`, top: `${y}%`, right: 'auto', bottom: 'auto',
      width: 'max-content', maxWidth: '90%', transform: 'translateX(-50%)',
    });
  }
}

customElements.define('meme-caption', MemeCaption);
customElements.define('meme-image', MemeImage);
