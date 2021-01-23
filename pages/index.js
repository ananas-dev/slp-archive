import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';

import SlpUpload from '../components/SlpUpload';
import SlpCardGrid from '../components/SlpCardGrid';

export default function Index() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">
            .SLP Archive
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box my={4}>
          <SlpCardGrid />
        </Box>
      </Container>
    </Container>
  );
}