import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
    json: () => Promise.resolve([{ name: 'doge', link: '/memes/doge' }]),
  })));
  window.history.pushState({}, '', '/');   // every test starts on the Home page
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// Routing: the menu switches between the pages without reloading
it('switches between Home and Meme History', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByText('No meme selected')).toBeInTheDocument();

  await user.click(screen.getByText('Meme History'));
  expect(screen.getByText(/No memes saved yet/)).toBeInTheDocument();
  expect(window.location.pathname).toBe('/history');

  await user.click(screen.getByText('Home'));
  expect(screen.getByText('No meme selected')).toBeInTheDocument();
});

// The history survives the page switch, because its state lives in App
it('shows a saved meme on the history page', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(await screen.findByAltText('doge'));
  await user.click(screen.getByText('Save to history'));

  await user.click(screen.getByText('Meme History'));
  expect(screen.getByAltText('doge meme')).toBeInTheDocument();
});

it('shows a 404 page for unknown URLs', () => {
  window.history.pushState({}, '', '/does-not-exist');
  render(<App />);
  expect(screen.getByText(/404/)).toBeInTheDocument();
});
