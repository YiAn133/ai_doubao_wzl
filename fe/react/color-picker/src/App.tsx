import ColorBrower  from "./commponts/CloroBrower";
import {  useState } from "react";
import {type Color} from './model/color'
import ColorPicker from "./commponts/ColorPicker";
import MemberTable  from "./commponts/MemberTable";

const App = () => {
  const [color , setColor] = useState<Color>({
    red:20,
    green:240,
    blue:180
  });
  return(
    <>
    <ColorBrower color={color}/>
    <ColorPicker color={color} onColorUpdated={setColor}/>
    <MemberTable />
    </>
  )



}







export default App;
