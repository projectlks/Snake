import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// Define the props type
interface GameOverProps {
  open: boolean;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ open, onRestart }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="game-over-dialog-title"
      aria-describedby="game-over-dialog-description"
      maxWidth="sm"
      fullWidth
      className="relative"
    >
      <DialogTitle id="game-over-dialog-title" className="relative">
        Game Over
        <div className='absolute top-1 right-1 '>
        <Button
          onClick={() => setIsOpen(false)}
          color="inherit"
          size="small"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Light background for the button
            color: 'white', // Default text color
            '&:hover': {
              backgroundColor: 'red', // Background color on hover
              color: 'white', // Text color on hover
            },
   
          }}
        >
          <Typography variant="h6">X</Typography>
        </Button>

        </div>
       
      </DialogTitle>
      <DialogContent>
      <Typography
        id="game-over-dialog-description"
        variant="body1"
        sx={{
          color: '#555', // Slightly lighter color for the description
          lineHeight: 1.6, // Increase line height for better readability
        }}
      >
        Unfortunately, you've lost the game. To restart, click the "Restart" button or press the Enter key on your keyboard.
      </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestart} color="primary" variant="contained">
          Restart
        </Button>
        <Button onClick={() => setIsOpen(false)} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOver;
