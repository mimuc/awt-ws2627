import './Layout.css';

// What every page shares: the blue header with the menu.
export default function Layout() {
  return (
    <>
      <header className="app-header">
        <span className="app-title">Meme Generator - React</span>
        {/*
          TODO 2: Add a menu with two links: "Home" (to "/") and "Meme History" (to "/history").
          - Use <Link> or <NavLink> from 'react-router' – not <a href>, which would reload the page.
          - NavLink adds the class "active" to the current page's link (styled in Layout.css).
        */}
      </header>
      {/* TODO 3: Add <Outlet /> here – that's where the current page is rendered. */}
    </>
  );
}
