# Breakout #1 – a second page for the Meme Generator (skeleton)

1. Start the backend: `cd ../../../tutorial03/meme-generator-backend && npm install && npm start`
2. Here: `npm install && npm run dev` → http://localhost:5173

This is last week's Meme Generator, with the generator moved to `src/pages/`. `react-router` is already in `package.json`.

Your tasks – template: `tutorial04/examples/react-with-routing`:
- **TODO 1** `src/App.tsx` – the routes: `/` → generator, `/history` → history, everything else → 404
- **TODO 2** `src/Layout.tsx` – the menu with two links
- **TODO 3** `src/Layout.tsx` – `<Outlet />` for the current page
- `src/pages/MemeHistory.tsx` – the new page (a heading is enough)
- **Bonus:** a "Save to history" button. Where does the history state have to live?

Solution: `../meme-generator-routing-solution`
