// Meme Generator – backend
//   GET /memes          → list of available templates: [{ name, link }]
//   GET /memes/:name    → the template rendered with captions, as an image
//       ?text=…&x=…&y=…      upper caption (x / y shift it in pixels)
//       &text2=…&x2=…&y2=…   lower caption
//
// Example: http://localhost:3001/memes/doge?text=such%20react&text2=very%20hooks

import express from 'express';
import { Jimp, loadFont, measureText, measureTextHeight } from 'jimp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PORT = process.env.PORT ?? 3001;
const ASSETS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets');
const TEMPLATES = {
  boromir: 'boromir.png',
  doge: 'doge.jpg',
  raptor: 'raptor.jpg',
  buzz: 'buzz.jpg',
  bernie: 'bernie.jpg',
  confessionbear: 'Confession-Bear.jpg',
  wonka: 'wonka.jpg',
};

const font = await loadFont(path.join(ASSETS, 'impact.fnt'));
const app = express();

// Allow the React dev server (another origin) to call this API.
app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/memes', (_req, res) => {
  res.json(Object.keys(TEMPLATES).map((name) => ({ name, link: `/memes/${name}` })));
});

app.get('/memes/:name', async (req, res) => {
  const file = TEMPLATES[req.params.name];
  if (!file) {
    return res.status(404).json({ error: `Unknown meme template "${req.params.name}"` });
  }

  const { text = '', x = 0, y = 0, text2 = '', x2 = 0, y2 = 0 } = req.query;
  const image = await Jimp.read(path.join(ASSETS, 'images', file));
  image.scale(2);
  const { width, height } = image.bitmap;

  // Centered horizontally, near the top / bottom edge, then shifted by x / y.
  image.print({
    font,
    x: (width - measureText(font, text)) / 2 + Number(x),
    y: 50 + Number(y),
    text,
  });
  image.print({
    font,
    x: (width - measureText(font, text2)) / 2 + Number(x2),
    y: height - measureTextHeight(font, text2, width) - 50 + Number(y2),
    text: text2,
  });

  res.type(image.mime).send(await image.getBuffer(image.mime));
});

app.listen(PORT, () => {
  console.log(`Meme Generator backend running on http://localhost:${PORT}`);
});
