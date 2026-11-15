import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './pages/Layout';
import MyFirstPage from './pages/MyFirstPage';
import MySecondPage from './pages/MySecondPage';
import SomeThirdPage from './pages/SomeThirdPage';
import NoPage from './pages/NoPage';

// App.jsx – the tech behind: which URL shows which component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyFirstPage />} />
          <Route path="secondpage" element={<MySecondPage />} />
          <Route path="thirdpage" element={<SomeThirdPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
