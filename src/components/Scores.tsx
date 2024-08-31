import { useEffect, useState } from "react";
import { SnakeSegment } from "../GameBoard";

interface Props {
  snake: SnakeSegment[];
}

export default function Scores({ snake }: Props) {
  const [score, setScore] = useState<number>(0);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);
  useEffect(() => {
    if (score !== snake.length - 3) {
      setScore(snake.length - 3);
      setIsChange(true);
    }
  }, [snake, setScore, score]);

  useEffect(() => {
    if (isChange) {
      const timeout = setTimeout(() => setIsChange(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isChange]);

  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem("highScore", JSON.stringify(score));
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    const score = JSON.parse(localStorage.getItem("highScore") as string);
    setHighScore(score || 0);
  }, []);

  return (
    <div className="flex w-[700px] justify-between items-center bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg shadow-md p-6">
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
