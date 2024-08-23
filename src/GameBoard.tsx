import { useState } from "react";
import RandomFood from "./components/RandomFood";
import Snake from "./components/Snake";
import { defaultFood } from "./components/default";

export interface SnakeSegment {
  colStart: number;
  rowStart: number;
}

export interface FoodPosition {
  randomCol: number;
  randomRow: number;
}

export default function GameBoard() {
  const [gameBoardWidth, setGameBoardWidth] = useState<number>(30);
  const [food, setFood] = useState<FoodPosition>(defaultFood);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#8d8de0]">
      <button className="hidden" onClick={() => setGameBoardWidth(30)}>
        change width
      </button>
      <section
        style={{
          gridTemplateColumns: `repeat(${gameBoardWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gameBoardWidth}, 1fr)`,
        }}
        className="grid w-[700px] h-[700px] bg-red-400"
      >
        <Snake food={food} setFood={setFood} defaultFood={defaultFood} gameBoardWidth = {gameBoardWidth} />
        <RandomFood food={food} />
      </section>
    </div>
  );
}
