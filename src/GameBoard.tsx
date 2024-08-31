import { useState } from "react";
import RandomFood from "./components/RandomFood";
import Snake from "./components/Snake";
import { defaultFood } from "./components/default";
import Scores from "./components/Scores";

export interface SnakeSegment {
  colStart: number;
  rowStart: number;
}

export interface FoodPosition {
  randomCol: number;
  randomRow: number;
}

 const defaultPosition: SnakeSegment[] = [
  { colStart: 6, rowStart: 5 },
  { colStart: 5, rowStart: 5 },
  { colStart: 4, rowStart: 5 },
];

export default function GameBoard() {
  const [gameBoardWidth, setGameBoardWidth] = useState<number>(30);
  const [food, setFood] = useState<FoodPosition>(defaultFood);
  const [snake, setSnake] = useState<SnakeSegment[]>(defaultPosition);


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#8d8de0]">
      <button className="hidden" onClick={() => setGameBoardWidth(30)}>
        change width
      </button>

      <Scores snake={snake}/>
      <section
        style={{
          gridTemplateColumns: `repeat(${gameBoardWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gameBoardWidth}, 1fr)`,
        }}
        className="grid w-[700px] h-[700px] bg-red-400"
      >
        <Snake  defaultPosition={defaultPosition} food={food} setFood={setFood} snake = {snake} setSnake = {setSnake} defaultFood={defaultFood} gameBoardWidth = {gameBoardWidth} />
        <RandomFood food={food} />
      </section>
    </div>
  );
}
