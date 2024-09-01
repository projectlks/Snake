import { FoodPosition } from "../GameBoard";

export const defaultFood = (gameBoardWidth: number): FoodPosition => ({
  randomCol: Math.floor(Math.random() * gameBoardWidth) + 1,
  randomRow: Math.floor(Math.random() * gameBoardWidth) + 1,
});
