import { useEffect } from "react";
import { SnakeSegment } from "../GameBoard";

interface Props {
  snake: SnakeSegment[];
  gameBoardWidth: number;
  setIsGameOver: (isGameOver: boolean) => void;
  setDirection: (direction: string) => void;
}

export default function useGameLogics({
  snake,
  gameBoardWidth,
  setIsGameOver,
  setDirection,
}: Props) {
  useEffect(() => {
    const head = snake[0];
    const collisionSegment = snake.slice(1).find(
      (item) =>
        item.colStart === head.colStart &&
        item.rowStart === head.rowStart
    );

    const outOfBounds = snake.find(
      (item) =>
        item.colStart > gameBoardWidth ||
        item.colStart < 1 ||
        item.rowStart > gameBoardWidth ||
        item.rowStart < 1
    );

    if (collisionSegment || outOfBounds) {
      setIsGameOver(true);
      setDirection("");
    }
  }, [snake, gameBoardWidth, setIsGameOver, setDirection]);
}
