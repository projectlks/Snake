import { useEffect, useState } from "react";
import { SnakeSegment } from "../GameBoard";

interface Props {
  snake: SnakeSegment[];
}

export default function useChangeSpeed({ snake }: Props) {
  const [snakeSpeed, setSnakeSpeed] = useState<number>(300);

  useEffect(() => {
    if (snake.length > 58) {
      setSnakeSpeed(100);
    } else if (snake.length > 53) {
      setSnakeSpeed(120);
    } else if (snake.length > 48) {
      setSnakeSpeed(140);
    } else if (snake.length > 43) {
      setSnakeSpeed(160);
    } else if (snake.length > 38) {
      setSnakeSpeed(180);
    } else if (snake.length > 33) {
      setSnakeSpeed(200);
    } else if (snake.length > 28) {
      setSnakeSpeed(220);
    } else if (snake.length > 23) {
      setSnakeSpeed(240);
    } else if (snake.length > 18) {
      setSnakeSpeed(260);
    } else if (snake.length > 13) {
      setSnakeSpeed(280);    
    } else {
      setSnakeSpeed(300);
    }
  }, [snake]);

  return snakeSpeed;
}
