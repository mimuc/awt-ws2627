import { useEffect, useState, type ChangeEvent } from 'react';
import {
  Box, Button, Card, CardActionArea, CardMedia, Collapse, Grid, IconButton,
  Stack, TextField, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';

interface Template {
  name: string;
  link: string;
}

interface Captions {
  topText: string;
  topX: number;
  topY: number;
  bottomText: string;
  bottomX: number;
  bottomY: number;
}

const NO_CAPTIONS: Captions = {
  topText: '', topX: 0, topY: 0,
  bottomText: '', bottomX: 0, bottomY: 0,
};

function memeUrl(template: Template, captions: Captions): string {
  const params = new URLSearchParams({
    text: captions.topText,
    x: String(captions.topX),
    y: String(captions.topY),
    text2: captions.bottomText,
    x2: String(captions.bottomX),
    y2: String(captions.bottomY),
  });
  return `${template.link}?${params}`;
}

interface MemeGeneratorProps {
  onSave: (template: string, url: string) => void;
}

// Same logic as last week – only the markup now uses MUI components.
export default function MemeGenerator({ onSave }: MemeGeneratorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);
  const [captions, setCaptions] = useState<Captions>(NO_CAPTIONS);
  const [showShift, setShowShift] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/memes', { signal: controller.signal })
      .then((res) => res.json() as Promise<Template[]>)
      .then(setTemplates)
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Could not load memes', err);
      });
    return () => controller.abort();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, valueAsNumber } = e.target;
    setCaptions((prev) => ({
      ...prev,
      [name]: type === 'number' ? (Number.isNaN(valueAsNumber) ? 0 : valueAsNumber) : value,
    }));
  }

  return (
    <Box sx={{
      display: 'grid', gridTemplateColumns: '180px 1fr 300px', gap: 2, p: 2,
      height: 'calc(100vh - 64px)', boxSizing: 'border-box',
    }}>
      {/* Left: the templates as clickable cards */}
      <Stack spacing={1} sx={{ overflowY: 'auto' }}>
        {templates.map((template) => (
          <Card
            key={template.name}
            variant="outlined"
            sx={{ flexShrink: 0, borderWidth: 3, borderColor: template.name === selected?.name ? 'primary.main' : 'transparent' }}
          >
            <CardActionArea onClick={() => setSelected(template)}>
              <CardMedia component="img" image={template.link} alt={template.name} />
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      {/* Middle: the rendered meme */}
      <Box sx={{ display: 'grid', placeItems: 'center', bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
        {selected
          ? <img src={memeUrl(selected, captions)} alt={`${selected.name} meme`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          : <Typography variant="h6" color="text.secondary">No meme selected</Typography>}
      </Box>

      {/* Right: the captions */}
      <Stack spacing={2}>
        <TextField
          name="topText"
          label="Upper text"
          value={captions.topText}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          name="bottomText"
          label="Lower text"
          value={captions.bottomText}
          onChange={handleChange}
          variant="outlined"
        />

        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Shift captions (px)</Typography>
          <IconButton aria-label="toggle shift fields" onClick={() => setShowShift((s) => !s)}>
            {showShift ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
        <Collapse in={showShift}>
          <Grid container spacing={2}>
            <Grid size={6}><TextField name="topX" label="Upper x" type="number" value={captions.topX} onChange={handleChange} fullWidth /></Grid>
            <Grid size={6}><TextField name="topY" label="Upper y" type="number" value={captions.topY} onChange={handleChange} fullWidth /></Grid>
            <Grid size={6}><TextField name="bottomX" label="Lower x" type="number" value={captions.bottomX} onChange={handleChange} fullWidth /></Grid>
            <Grid size={6}><TextField name="bottomY" label="Lower y" type="number" value={captions.bottomY} onChange={handleChange} fullWidth /></Grid>
          </Grid>
        </Collapse>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!selected}
          onClick={() => selected && onSave(selected.name, memeUrl(selected, captions))}
        >
          Save to history
        </Button>
      </Stack>
    </Box>
  );
}
