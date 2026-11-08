# Meme Generator – React + TypeScript

1. Start the backend first: `cd ../../meme-generator-backend && npm install && npm start`
2. Then here: `npm install && npm run dev` → http://localhost:5173

The Vite dev server forwards every request to `/memes` to the backend on port 3001
(see `server.proxy` in `vite.config.ts`), so the app can simply call `fetch('/memes')`.

- Solution for Breakout #1: `src/MemeGenerator.tsx`.

- Solution for Breakout #2: `src/MemeGenerator.test.tsx` – run with `npm test`.
