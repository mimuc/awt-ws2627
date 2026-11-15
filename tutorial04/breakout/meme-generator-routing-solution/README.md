# Breakout #1 – solution: a second page for the Meme Generator

Skeleton: `../meme-generator-routing`

1. Start the backend: `cd ../../../tutorial03/meme-generator-backend && npm start`
2. Here: `npm install && npm run dev` → http://localhost:5173 · tests: `npm test`

- `src/App.tsx` – the routes, and the meme history state (above the routes, so it survives page switches)
- `src/Layout.tsx` – header + menu (`NavLink`) + `<Outlet />`
- `src/pages/MemeGenerator.tsx` – last week's generator, plus a "Save to history" button
- `src/pages/MemeHistory.tsx` – the saved memes
- `src/App.test.tsx` – tests for the routing and the history
