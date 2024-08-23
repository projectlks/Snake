import { FoodPosition } from "../GameBoard";

export const defaultFood = (): FoodPosition => ({
    randomCol: Math.floor(Math.random() * 30 + 1),
    randomRow: Math.floor(Math.random() * 30 + 1),
  });