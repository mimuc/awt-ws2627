import { useEffect, useState, type ChangeEvent } from 'react';
import './MemeGenerator.css';

// A meme template, as the backend lists it under GET /memes
interface Template {
  name: string;
  link: string;   // e.g. /memes/doge
}

interface Captions {
  topText: string;
  topX: number;
  topY: number;
  bottomText: string;
  bottomX: number;
  bottomY: number;
}

const NO_CAPTIONS: Captions = {
  topText: '', topX: 0, topY: 0,
  bottomText: '', bottomX: 0, bottomY: 0,
};

// The backend renders the meme: template + captions go into the URL.
function memeUrl(template: Template, captions: Captions): string {
  const params = new URLSearchParams({
    text: captions.topText,
    x: String(captions.topX),
    y: String(captions.topY),
    text2: captions.bottomText,
    x2: String(captions.bottomX),
    y2: String(captions.bottomY),
  });
  return `${template.link}?${params}`;
}

export default function MemeGenerator() {
  // Three pieces of state:
  // - templates: all meme templates, loaded from the backend
  // - selected:  the template the user clicked (null = none yet)
  // - captions:  what the user typed into the inputs on the right
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);
  const [captions, setCaptions] = useState<Captions>(NO_CAPTIONS);

  // Side effect: load the templates once, when the component first appears.
  // The cleanup aborts the request if the component disappears first
  // (in development, StrictMode mounts twice on purpose).
  useEffect(() => {
    const controller = new AbortController();
    fetch('/memes', { signal: controller.signal })
      .then((res) => res.json() as Promise<Template[]>)
      .then(setTemplates)
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Could not load memes', err);
      });
    return () => controller.abort();
  }, []);

  // One handler for all six inputs: the input's name says which field to update.
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, valueAsNumber } = e.target;
    setCaptions((prev) => ({
      ...prev,
      [name]: type === 'number' ? (Number.isNaN(valueAsNumber) ? 0 : valueAsNumber) : value,
    }));
  }

  return (
    <div className="meme-generator">
      <ul className="template-list">
        {templates.map((template) => (
          <li key={template.name}>
            <button
              className={template.name === selected?.name ? 'selected' : undefined}
              onClick={() => setSelected(template)}
            >
              <img src={template.link} alt={template.name} />
            </button>
          </li>
        ))}
      </ul>

      <div className="result">
        {selected
          ? <img src={memeUrl(selected, captions)} alt={`${selected.name} meme`} />
          : <h3>No meme selected</h3>}
      </div>

      <div className="params">
        <label>Upper text
          <input name="topText" value={captions.topText} onChange={handleChange} type="text" />
        </label>
        <label>Lower text
          <input name="bottomText" value={captions.bottomText} onChange={handleChange} type="text" />
        </label>
        <fieldset>
          <legend>Shift (px)</legend>
          <label>Upper x <input name="topX" value={captions.topX} onChange={handleChange} type="number" /></label>
          <label>Upper y <input name="topY" value={captions.topY} onChange={handleChange} type="number" /></label>
          <label>Lower x <input name="bottomX" value={captions.bottomX} onChange={handleChange} type="number" /></label>
          <label>Lower y <input name="bottomY" value={captions.bottomY} onChange={handleChange} type="number" /></label>
        </fieldset>
      </div>
    </div>
  );
}
