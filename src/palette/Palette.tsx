import 'rc-slider/assets/index.css'
import { useState } from 'react'
import ColorBox from '../colorBox/ColorBox'
import Navbar from '../navbar/Navbar'
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
            <div className={'slider'}>
                <Navbar level={level} onChange={changeLevel} />
            </div>

            <div className={'Palette-colors'}>{colorBoxes}</div>
        </div>
    )

    function changeLevel(newLevel: number | number[]) {
        if (!Array.isArray(newLevel)) setLevel(newLevel)
    }
}
