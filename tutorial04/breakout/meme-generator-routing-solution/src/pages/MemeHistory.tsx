import type { SavedMeme } from '../types';
import './MemeHistory.css';

interface MemeHistoryProps {
  memes: SavedMeme[];
}

// The second page: all memes the user saved, newest first.
export default function MemeHistory({ memes }: MemeHistoryProps) {
  if (memes.length === 0) {
    return <p className="history-empty">No memes saved yet – create one on the Home page.</p>;
  }
  return (
    <ul className="history">
      {memes.map((meme) => (
        <li key={meme.id}>
          <h3>{meme.template}</h3>
          <img src={meme.url} alt={`${meme.template} meme`} />
        </li>
      ))}
    </ul>
  );
}
