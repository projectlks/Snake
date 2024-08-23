import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// Define the props type
interface GameOverProps {
  open: boolean;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ open, onRestart }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="game-over-dialog-title"
      aria-describedby="game-over-dialog-description"
    >
      <DialogTitle id="game-over-dialog-title">Game Over</DialogTitle>
      <DialogContent>
        <Typography id="game-over-dialog-description">
          You've lost the game. Do you want to try again?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestart} color="primary" variant="contained">
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOver;
