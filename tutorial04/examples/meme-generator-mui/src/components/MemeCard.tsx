import { Card, CardContent, Typography } from '@mui/material';
import type { SavedMeme } from '../types';

interface MemeCardProps {
  meme: SavedMeme;
}

// One meme in the history. loading="lazy" is built into the browser:
// the image is only downloaded when it is about to scroll into view.
const MemeCard = ({ meme }: MemeCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{meme.template}</Typography>
        <img
          src={meme.url}
          alt={`${meme.template} meme`}
          loading="lazy"
          width={512}
          height={384}
          style={{ maxWidth: '100%', height: 'auto' }} />
      </CardContent>
    </Card>
  );
};

export default MemeCard;
