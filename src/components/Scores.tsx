import { useEffect, useState } from "react";
import { FoodPosition, SnakeSegment } from "../GameBoard";
import { defaultFood } from "./default";

interface Props {
  snake: SnakeSegment[];
  setGameBoardWidth: React.Dispatch<React.SetStateAction<number>>;
  setFood: React.Dispatch<React.SetStateAction<FoodPosition>>;
  gameBoardWidth: number;
}

export default function Scores({
  snake,
  setGameBoardWidth,
  setFood,
  gameBoardWidth,
}: Props) {
  const [score, setScore] = useState<number>(0);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);
  const [mode, setMode] = useState<string>("Medium");

  useEffect(() => {
    const currentScore = snake.length - 3;
    if (score !== currentScore) {
      setScore(currentScore);
      setIsChange(true);
    }
  }, [snake, score]);

  useEffect(() => {
    if (isChange) {
      const timeout = setTimeout(() => setIsChange(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isChange]);

  useEffect(() => {
    const storedHighScore = JSON.parse(
      localStorage.getItem("highScore") || "0"
    );
    setHighScore(storedHighScore);
  }, []);

  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem("highScore", JSON.stringify(score));
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    setFood(defaultFood(gameBoardWidth));
    switch (mode) {
      case "Easy":
        setGameBoardWidth(20);
        break;
      case "Medium":
        setGameBoardWidth(30);
        break;
      case "Hard":
        setGameBoardWidth(40);
        break;
      default:
        setGameBoardWidth(30);
        break;
    }
  }, [mode, setGameBoardWidth, setFood, gameBoardWidth]);

  return (
    <div className="flex w-[700px] justify-between items-center bg-gradient-to-tl from-[#608dff] to-[#0061ff] rounded-lg shadow-md p-6">
      <div className="flex flex-col text-center">
        <span className="text-white text-lg font-medium">Current Score</span>
        <span
          className={`text-white text-4xl font-bold ${
            isChange ? "animate-score-change" : ""
          } `}
        >
          {score}
        </span>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-white text-lg font-medium">Mode</span>
        <select
          className="text-white  transition-all text-xl font-bold bg-transparent border-2 border-white rounded-lg p-1 mt-2 hover:bg-white hover:text-blue-600 focus:bg-blue-600 focus:text-white  duration-300 ease-in-out"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="Easy" className="text-gray-900 transition-all">
            Easy
          </option>
          <option value="Medium" className="text-gray-900 transition-all">
            Medium
          </option>
          <option value="Hard" className="text-gray-900 transition-all">
            Hard
          </option>
        </select>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-white text-lg font-medium">High Score</span>
        <span
          className={`text-white text-4xl font-bold ${
            isChange && score === highScore ? "animate-score-change" : ""
          } `}
        >
          {highScore}
        </span>
      </div>
    </div>
  );
}
