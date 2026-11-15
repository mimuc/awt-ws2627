# React with Routing

`npm install && npm run dev`

- `src/App.jsx` – which URL shows which component (`BrowserRouter`, `Routes`, `Route`)
- `src/pages/Layout.jsx` – what every page shares: the menu (`Link`) and `<Outlet />`, where the current page appears
- `src/pages/*Page.jsx` – the pages; `NoPage.jsx` is shown for unknown URLs (`path="*"`)
