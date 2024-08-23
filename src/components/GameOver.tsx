import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// Define the props type
interface GameOverProps {
  open: boolean;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ open, onRestart }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(()=>{
    setIsOpen(open)
  },[open])
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="game-over-dialog-title"
      aria-describedby="game-over-dialog-description"
      className='relative'
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

<div className='absolute top-0 right-0 w-6 aspect-square bg-red-600'>
<button className=' w-full p-0 m-0' onClick={()=>setIsOpen(false)}>X</button>

</div>

    </Dialog>
  );
};

export default GameOver;
