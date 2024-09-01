import { useCallback, useEffect, useState } from "react";
import { FoodPosition, SnakeSegment } from "../GameBoard";
import GameOver from "./GameOver";
import useHandleKeys from "../hooks/useHandleKeys";
import useChangeSpeed from "../hooks/useChangeSpeed";
import useGameLogics from "../hooks/useGameLogics";
import { defaultFood } from "./default";

interface Props {
  food: FoodPosition;
  setFood: React.Dispatch<React.SetStateAction<FoodPosition>>;
  gameBoardWidth: number;
  snake: SnakeSegment[];
  setSnake: React.Dispatch<React.SetStateAction<SnakeSegment[]>>;
  defaultPosition: SnakeSegment[];
}

export default function Snake({
  food,
  setFood,
  gameBoardWidth,
  snake,
  setSnake,
  defaultPosition,
}: Props) {
  const [eat, setEat] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

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
  }, [direction, eat, setSnake]);

  const handleRestart = useCallback(() => {
    setFood(defaultFood(gameBoardWidth));
    setSnake(defaultPosition);
    setDirection("");
    setIsGameOver(false);
  }, [setFood, setSnake, defaultPosition, gameBoardWidth]);

  const handleKey = useHandleKeys({
    direction,
    setDirection,
    isGameOver,
    handleRestart,
    snake
  });

  const snakeSpeed = useChangeSpeed({ snake });

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (
      snake[0].colStart === food.randomCol &&
      snake[0].rowStart === food.randomRow
    ) {
      setFood(defaultFood(gameBoardWidth));
      setEat(true);
    }
  }, [snake, food, setFood, gameBoardWidth]);

  useEffect(() => {
    if (direction === "") return;
    const interval = setInterval(snakeMove, snakeSpeed);
    return () => clearInterval(interval);
  }, [snakeMove, direction, snakeSpeed]);

  useGameLogics({
    snake,
    gameBoardWidth,
    setIsGameOver,
    setDirection,
  });


  useEffect(()=>{

    const snakeWithoutHead = snake.slice(1)

    if(snakeWithoutHead.find((item)=>{
      return(
        item.colStart === food.randomCol && 
        item.rowStart === food.randomRow
      )
    })){
    setFood(defaultFood(gameBoardWidth))
    }
  },[snake, food, setFood, gameBoardWidth])



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
