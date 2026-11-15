# Meme Generator – styled with Material UI (Breakout #2 – solution)

1. Start the backend: `cd ../../../tutorial03/meme-generator-backend && npm start`
2. Here: `npm install && npm run dev` → http://localhost:5173 · tests: `npm test`

- `src/Layout.tsx` – the menu as an MUI `AppBar`; `Button component={NavLink}` makes a button a router link
- `src/pages/MemeGenerator.tsx` – `TextField`, clickable `Card`s, `Collapse` + `IconButton`, `Grid`
- `src/pages/MemeHistory.tsx` – `Grid` of cards + `Pagination` (6 per page)
- `src/components/MemeCard.tsx` – one meme; `loading="lazy"` lets the browser load images only when they scroll into view

Same logic and same tests as the plain version – only the markup changed.
