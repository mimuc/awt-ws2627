# Meme Generator – React + TypeScript

1. Start the backend first: `cd ../../meme-generator-backend && npm install && npm start`
2. Then here: `npm install && npm run dev` → http://localhost:5173

The Vite dev server forwards every request to `/memes` to the backend on port 3001
(see `server.proxy` in `vite.config.ts`), so the app can simply call `fetch('/memes')`.

- Breakout #1: complete the two TODOs in `src/MemeGenerator.tsx`.
  (`npm run build` reports unused variables until both TODOs are done – `npm run dev` works anyway.)
- Breakout #2: write tests in `src/MemeGenerator.test.tsx`, run them with `npm test`.
