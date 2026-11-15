import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './Layout';
import MemeGenerator from './pages/MemeGenerator';
import MemeHistory from './pages/MemeHistory';
import NoPage from './pages/NoPage';
import type { SavedMeme } from './types';

export default function App() {
  // The history lives here – above the routes – so it survives page switches.
  // (State inside a page component is gone as soon as you navigate away.)
  const [history, setHistory] = useState<SavedMeme[]>([]);

  function saveMeme(template: string, url: string) {
    setHistory((prev) => [{ id: Date.now(), template, url }, ...prev]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MemeGenerator onSave={saveMeme} />} />
          <Route path="history" element={<MemeHistory memes={history} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
