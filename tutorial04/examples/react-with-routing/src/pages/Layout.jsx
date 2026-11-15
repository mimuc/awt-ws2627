import { Link, Outlet } from 'react-router';

// Layout.jsx – what the user sees on every page.
// <Outlet /> is the spot where the current page is rendered.
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secondpage">Second Page</Link>
          </li>
          <li>
            <Link to="/thirdpage">Third Page</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
