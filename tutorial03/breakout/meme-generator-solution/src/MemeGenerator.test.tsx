import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemeGenerator from './MemeGenerator';

// The component loads its templates from the backend. In a test we don't want
// a real server, so we replace fetch with a fake that answers immediately.
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
    json: () => Promise.resolve([
      { name: 'doge', link: '/memes/doge' },
      { name: 'wonka', link: '/memes/wonka' },
    ]),
  })));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// 1. renders without errors
it('renders without crashing', async () => {
  render(<MemeGenerator />);
  expect(screen.getByText('No meme selected')).toBeInTheDocument();
  // the templates from the (fake) backend appear on the left
  expect(await screen.findByAltText('doge')).toBeInTheDocument();
});

// 2. the middle image shows the template the user clicked on the left
it('shows the clicked template in the middle', async () => {
  const user = userEvent.setup();
  render(<MemeGenerator />);

  await user.click(await screen.findByAltText('wonka'));

  const meme = screen.getByAltText('wonka meme');
  expect(meme.getAttribute('src')).toMatch(/^\/memes\/wonka\?/);
});

// 3. the middle image is rendered with the upper / lower text the user types
it('puts the typed captions into the meme', async () => {
  const user = userEvent.setup();
  render(<MemeGenerator />);
  await user.click(await screen.findByAltText('doge'));

  await user.type(screen.getByLabelText('Upper text'), 'such react');
  await user.type(screen.getByLabelText('Lower text'), 'very hooks');

  const src = screen.getByAltText('doge meme').getAttribute('src')!;
  const params = new URL(src, 'http://localhost').searchParams;
  expect(params.get('text')).toBe('such react');
  expect(params.get('text2')).toBe('very hooks');
});
