import { useEffect, useState } from "react";
import { SnakeSegment } from "../GameBoard";

interface Props {
  snake: SnakeSegment[];
}

export default function useChangeSpeed({ snake }: Props) {
  const [snakeSpeed, setSnakeSpeed] = useState<number>(300);

  useEffect(() => {
    if (snake.length > 13) setSnakeSpeed(280);
    if (snake.length > 18) setSnakeSpeed(260);
    if (snake.length > 23) setSnakeSpeed(240);
    if (snake.length > 28) setSnakeSpeed(220);
    if (snake.length > 33) setSnakeSpeed(200);
    if (snake.length > 38) setSnakeSpeed(180);
    if (snake.length > 43) setSnakeSpeed(160);
    if (snake.length > 48) setSnakeSpeed(140);
    if (snake.length > 53) setSnakeSpeed(120);
    if (snake.length > 58) setSnakeSpeed(100);
  }, [snake]);

  return snakeSpeed;
}
