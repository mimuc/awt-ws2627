import { NavLink, Outlet } from 'react-router';
import './Layout.css';

// The part every page shares: the blue header with the menu.
// <Outlet /> is where the current page (generator or history) is rendered.
export default function Layout() {
  return (
    <>
      <header className="app-header">
        <span className="app-title">Meme Generator - React</span>
        <nav>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/history">Meme History</NavLink></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
