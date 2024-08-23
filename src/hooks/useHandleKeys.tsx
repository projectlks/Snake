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
  const [isPause, setIsPause] = useState<string>("");
  const [isStart, setIsStart] = useState<boolean>(true);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          if (direction !== "ArrowRight" && isPause !== "ArrowRight" && !isStart) {
            setDirection("ArrowLeft");
            setIsPause("");
          }
          break;
        case "ArrowRight":
          if (direction !== "ArrowLeft" && isPause !== "ArrowLeft") {
            setDirection("ArrowRight");
            setIsStart(false);
            setIsPause("");
          }
          break;
        case "ArrowUp":
          if (direction !== "ArrowDown" && isPause !== "ArrowDown") {
            setIsStart(false);
            setDirection("ArrowUp");
            setIsPause("");
          }
          break;
        case "ArrowDown":
          if (direction !== "ArrowUp" && isPause !== "ArrowUp") {
            setIsStart(false);
            setDirection("ArrowDown");
            setIsPause("");
          }
          break;
        case "Enter":
          if (isGameOver) {
            handleRestart();
          }
          break;
        case "p":
          if (isPause === "") {
            setDirection("");
            setIsPause(direction);
          } else {
            setDirection(isPause);
            setIsPause("");
          }
          break;
        default:
          break;
      }
    },
    [direction, isGameOver, handleRestart, isPause, isStart, setDirection]
  );

  return handleKey;
}
