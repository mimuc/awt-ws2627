import MemeImage from './MemeImage';
import MemeCaption from './MemeCaption';
import './App.css';

// More memes as data. A meme can have as many captions as it likes.
const memes = [
  {
    id: 1, template: 'X-X-Everywhere.jpg',
    captions: [
      { id: 1, position: 'top', text: 'Callbacks' },
      { id: 2, position: 'bottom', text: 'Callbacks everywhere' },
    ],
  },
  {
    id: 2, template: 'Spiderman-Peter-Parker.jpg',
    captions: [
      { id: 1, position: 'top', text: 'It will be fun' },
      { id: 2, position: 'bottom', text: 'I promise' },
    ],
  },
];

export default function App() {
  return (
    <main className="memes">
      {/* Written out by hand – reads just like last week's HTML: */}
      <MemeImage editable templateUrl="One-Does-Not-Simply.jpg">
        <MemeCaption position="top">One does not simply</MemeCaption>
        <MemeCaption position="bottom">Write beautiful JavaScript</MemeCaption>
        <MemeCaption x={30} y={22}>A third one</MemeCaption>
      </MemeImage>

      {/* …or generated from data with .map() – keys tell React who is who. */}
      {memes.map((meme) => (
        <MemeImage key={meme.id} templateUrl={meme.template}>
          {meme.captions.map((c) => (
            <MemeCaption key={c.id} position={c.position} x={c.x} y={c.y}>
              {c.text}
            </MemeCaption>
          ))}
        </MemeImage>
      ))}
    </main>
  );
}
