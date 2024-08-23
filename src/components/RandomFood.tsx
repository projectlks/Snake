import { FoodPosition } from "../GameBoard"
import img from '../assets/pngegg.png'

interface Props {
  food : FoodPosition
}

export default function RandomFood({food} : Props) {

  
  return (
    <div 
    style={{
        gridColumnStart : food.randomCol,
        gridRowStart: food.randomRow
    }}
    className="w-full h-full">
      <img src={img} alt="apple.png"  className="animate-bounce"/>
    </div>
  )
}