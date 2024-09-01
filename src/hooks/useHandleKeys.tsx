import { useCallback, useState, useEffect } from "react";
import useChangeSpeed from "./useChangeSpeed";
import { SnakeSegment } from "../GameBoard";

interface Props {
  direction: string;
  setDirection: (dir: string) => void;
  isGameOver: boolean;
  handleRestart: () => void;
  snake: SnakeSegment[];
}

export default function useHandleKeys({
  direction,
  setDirection,
  isGameOver,
  handleRestart,
  snake
}: Props) {
  const [isStart, setIsStart] = useState<boolean>(true);
  const [delayTime, setDelayTime] = useState<boolean>(false);

  const snakeSpeed = useChangeSpeed({ snake });

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (delayTime) return; // Do nothing if delayTime is true
      if (isGameOver && e.key !== 'Enter') return; // Only allow Enter key if the game is over

      switch (e.key) {
        case "ArrowLeft":
          if (direction !== "ArrowRight" && !isStart) {
            setDirection("ArrowLeft");
            setIsStart(false);
            setDelayTime(true); // Trigger delay
          }
          break;
        case "ArrowRight":
          if (direction !== "ArrowLeft") {
            setDirection("ArrowRight");
            setIsStart(false);
            setDelayTime(true); // Trigger delay
          }
          break;
        case "ArrowUp":
          if (direction !== "ArrowDown") {
            setDirection("ArrowUp");
            setIsStart(false);
            setDelayTime(true); // Trigger delay
          }
          break;
        case "ArrowDown":
          if (direction !== "ArrowUp") {
            setDirection("ArrowDown");
            setIsStart(false);
            setDelayTime(true); // Trigger delay
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
    [direction, isGameOver, handleRestart, isStart, delayTime, setDirection]
  );

  useEffect(() => {
    if (delayTime) {
      const timer = setTimeout(() => {
        setDelayTime(false); // Reset delayTime after the specified delay
      }, snakeSpeed);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when delayTime changes
    }
  }, [delayTime, snakeSpeed]);

  return handleKey;
}
