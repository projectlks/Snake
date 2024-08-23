import { useCallback, useEffect, useState } from "react";
import { FoodPosition, SnakeSegment } from "../GameBoard";
import GameOver from "./GameOver";

const defaultPosition: SnakeSegment[] = [
  { colStart: 6, rowStart: 5 },
  { colStart: 5, rowStart: 5 },
  { colStart: 4, rowStart: 5 },
];

interface Props {
  food: FoodPosition;
  setFood: React.Dispatch<React.SetStateAction<FoodPosition>>;
  defaultFood: () => FoodPosition;
  gameBoardWidth: number;
}

export default function Snake({
  food,
  setFood,
  defaultFood,
  gameBoardWidth,
}: Props) {
  const [snake, setSnake] = useState<SnakeSegment[]>(defaultPosition);
  const [eat, setEat] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("");
  const [snakeSpeed, setSnakeSpeed] = useState<number>(300);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<string>("");
  const [isStart, setIsStart] = useState<boolean>(true);

  const snakeMove = useCallback(() => {
    setSnake((prev) => {
      const newHead = { ...prev[0] };

      if (direction === "ArrowLeft") newHead.colStart -= 1;
      if (direction === "ArrowRight") newHead.colStart += 1;
      if (direction === "ArrowUp") newHead.rowStart -= 1;
      if (direction === "ArrowDown") newHead.rowStart += 1;

      const newArray = [...prev];
      if (!eat) newArray.pop();
      else setEat(false);

      return [newHead, ...newArray];
    });
  }, [direction, eat]);

  const handleRestart = useCallback(() => {
    setFood(defaultFood);
    setSnake(defaultPosition);
    setDirection("");
    setIsGameOver(false); // Reset game over state
  }, [defaultFood, setFood]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key === "ArrowLeft" &&
        direction !== "ArrowRight" &&
        isPause !== "ArrowRight" &&
        !isStart
      ) {
        setDirection("ArrowLeft");
        setIsPause("");
      } else if (
        e.key === "ArrowRight" &&
        direction !== "ArrowLeft" &&
        isPause !== "ArrowLeft"
      ) {
        setDirection("ArrowRight");
        setIsStart(false);

        setIsPause("");
      } else if (
        e.key === "ArrowUp" &&
        direction !== "ArrowDown" &&
        isPause !== "ArrowDown"
      ) {
        setIsStart(false);

        setDirection("ArrowUp");
        setIsPause("");
      } else if (
        e.key === "ArrowDown" &&
        direction !== "ArrowUp" &&
        isPause !== "ArrowUp"
      ) {
        setIsStart(false);

        setDirection("ArrowDown");
        setIsPause("");
      } else if (e.key === "Enter" && isGameOver) {
        handleRestart();
      } else if (e.key === "p") {
        if (isPause === "") {
          setDirection("");
          setIsPause(direction);
        } else {
          setDirection(isPause);
          setIsPause("");
        }
      }
    },
    [direction, isGameOver, handleRestart, isPause, isStart]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (
      snake[0].colStart === food.randomCol &&
      snake[0].rowStart === food.randomRow
    ) {
      setFood(defaultFood);
      setEat(true);
    }
  }, [snake, food, setFood, defaultFood]);

  useEffect(() => {
    if (direction === "") return;
    const interval = setInterval(snakeMove, snakeSpeed);
    return () => clearInterval(interval);
  }, [snakeMove, direction, snakeSpeed]);

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

  useEffect(() => {
    const newArray = snake.slice(1);
    if (
      newArray.some(
        (item) =>
          item.colStart === snake[0].colStart &&
          item.rowStart === snake[0].rowStart
      ) ||
      snake.some(
        (item) =>
          item.colStart > gameBoardWidth ||
          item.colStart < 1 ||
          item.rowStart > gameBoardWidth ||
          item.rowStart < 1
      )
    ) {
      setIsGameOver(true);
      setDirection("");
    }
  }, [snake, gameBoardWidth]);

  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`${
            index === 0 ? "bg-green-500" : "bg-blue-500"
          } w-full h-full`}
          style={{
            gridColumnStart: segment.colStart,
            gridColumnEnd: segment.colStart + 1,
            gridRowStart: segment.rowStart,
            gridRowEnd: segment.rowStart + 1,
          }}
        ></div>
      ))}
      <GameOver open={isGameOver} onRestart={handleRestart} />
    </>
  );
}
