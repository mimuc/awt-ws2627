import { useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import MemeCard from '../components/MemeCard';
import type { SavedMeme } from '../types';

const PER_PAGE = 6;

interface MemeHistoryProps {
  memes: SavedMeme[];
}

export default function MemeHistory({ memes }: MemeHistoryProps) {
  const [page, setPage] = useState(1);

  if (memes.length === 0) {
    return <Typography sx={{ p: 2 }}>No memes saved yet – create one on the Home page.</Typography>;
  }

  // Paging: only show PER_PAGE memes at a time
  const pageCount = Math.ceil(memes.length / PER_PAGE);
  const visible = memes.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {visible.map((meme) => (
          <Grid key={meme.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <MemeCard meme={meme} />
          </Grid>
        ))}
      </Grid>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Box>
  );
}
