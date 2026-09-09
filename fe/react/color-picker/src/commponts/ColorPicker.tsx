import * as React from 'react';
import { type Color} from '../model/color';

interface Props{
    color:Color;
    onColorUpdated:(color:Color) => void
}

const ColorPicker:React.FC<Props> = (props) => {
    return (
        <div>
            <input type="range" min="0" max="255" 
            value={props.color.red} 
            onChange={event => props.onColorUpdated({
                ...props.color,
                red: +event.target.value
            })} />
            红色：{props.color.red}
            <br />
            <input type="range" min="0" max="255" 
            value={props.color.green} 
            onChange={event => props.onColorUpdated({
                ...props.color,
                green: +event.target.value
            })} />
            绿色：{props.color.green}
            <br />
            <input type="range" min="0" max="255" 
            value={props.color.blue} 
            onChange={event => props.onColorUpdated({
                ...props.color,
                blue: +event.target.value
            })} />
            蓝色：{props.color.blue}
        </div>
    )
}

export default ColorPicker;