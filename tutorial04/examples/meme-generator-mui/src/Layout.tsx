import { NavLink, Outlet } from 'react-router';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

// Breakout #2: the menu as an MUI AppBar.
// component={NavLink} turns the MUI Button into a router link.
export default function Layout() {
  const linkStyle = { '&.active': { bgcolor: 'rgb(255 255 255 / 0.2)' } };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Meme Generator - React
          </Typography>
          <Button color="inherit" component={NavLink} to="/" end sx={linkStyle}>Home</Button>
          <Button color="inherit" component={NavLink} to="/history" sx={linkStyle}>Meme History</Button>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
}
