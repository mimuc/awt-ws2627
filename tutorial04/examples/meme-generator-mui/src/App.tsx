import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './Layout';
import MemeGenerator from './pages/MemeGenerator';
import MemeHistory from './pages/MemeHistory';
import NoPage from './pages/NoPage';
import type { SavedMeme } from './types';

const theme = createTheme();   // MUI's default Material look – customise colours etc. here

export default function App() {
  // The history lives above the routes, so it survives page switches.
  const [history, setHistory] = useState<SavedMeme[]>([]);

  function saveMeme(template: string, url: string) {
    setHistory((prev) => [{ id: Date.now(), template, url }, ...prev]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* consistent base styles across browsers */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MemeGenerator onSave={saveMeme} />} />
            <Route path="history" element={<MemeHistory memes={history} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
