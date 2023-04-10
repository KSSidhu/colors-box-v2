import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import ColorBox from '../colorBox/ColorBox'
import { Palette } from '../utils/colorHelper'
import './Palette.css'

interface PaletteProps {
    palette: Palette
}

export default function Palette(props: PaletteProps) {
    const [level, setLevel] = useState(500)
    const { palette } = props

    const colorBoxes = palette.colors[level].map((color) => (
        <ColorBox background={color.hex} name={color.name} />
    ))
    return (
        <div className={'Palette'}>
            <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChange={changeLevel}
            />
            <div className={'Palette-colors'}>{colorBoxes}</div>
        </div>
    )

    function changeLevel(newLevel: number | number[]) {
        if (!Array.isArray(newLevel)) setLevel(newLevel)
    }
}
