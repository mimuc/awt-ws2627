import './Meme.css';

const MEME_BASE = 'https://imgflip.com/s/meme/';

// Last week: <meme-image> with a <slot>.
// In React, whatever you put between the tags arrives as `children`.
export default function MemeImage({ templateUrl, editable = false, children }) {
  return (
    <div className={editable ? 'meme editable' : 'meme'}>
      <img src={new URL(templateUrl, MEME_BASE).href} alt="" />
      {children}
    </div>
  );
}
