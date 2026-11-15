import MemeGenerator from './pages/MemeGenerator';
import './Layout.css';

// Breakout #1 – a second page for the Meme Generator.
// Use tutorial04/examples/react-with-routing as your template.

export default function App() {
  /*
    TODO 1: Turn this into an app with two pages.
    - Wrap everything in <BrowserRouter> and <Routes> (import them from 'react-router').
    - "/" shows the <Layout />, with the pages nested inside it:
        index      → <MemeGenerator />
        "history"  → <MemeHistory />
        "*"        → <NoPage />   (any URL that doesn't exist)
    - The header below then moves into Layout.tsx.

    BONUS: a "Save to history" button in the generator that adds the current meme
    to the history page. Where does that state have to live, so it survives
    switching pages?
  */
  return (
    <>
      <header className="app-header">
        <span className="app-title">Meme Generator - React</span>
      </header>
      <MemeGenerator />
    </>
  );
}
