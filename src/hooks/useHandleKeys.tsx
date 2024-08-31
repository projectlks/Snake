import { useCallback, useState } from "react";

interface Props {
  direction: string;
  setDirection: (dir: string) => void;
  isGameOver: boolean;
  handleRestart: () => void;
}

export default function useHandleKeys({
  direction,
  setDirection,
  isGameOver,
  handleRestart,
}: Props) {

  const [isStart, setIsStart] = useState<boolean>(true);
  

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if(isGameOver && e.key !== 'Enter') return
      switch (e.key) {
        case "ArrowLeft":
          if (direction !== "ArrowRight"  && !isStart) {
            setDirection("ArrowLeft");
          }
          break;
        case "ArrowRight":
          if (direction !== "ArrowLeft" ) {
            setDirection("ArrowRight");
            setIsStart(false);
          }
          break;
        case "ArrowUp":
          if (direction !== "ArrowDown"  ) {
            setIsStart(false);
            setDirection("ArrowUp");
          }
          break;
        case "ArrowDown":
          if (direction !== "ArrowUp" ) {
            setIsStart(false);
            setDirection("ArrowDown");
       
          }
          break;
        case "Enter":
          if (isGameOver) {
            handleRestart();
          }
          break;
      
        default:
          break;
      }
    },
    [direction, isGameOver, handleRestart,  isStart, setDirection]
  );

  return handleKey;
}
