import 'rc-slider/assets/index.css'
import { useState } from 'react'
import ColorBox from '../colorBox/ColorBox'
import Navbar from '../navbar/Navbar'
import { Format, Palette } from '../utils/colorHelper'
import './Palette.css'

interface PaletteProps {
    palette: Palette
}

export default function Palette(props: PaletteProps) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState<Format>('hex')
    const { palette } = props

    const colorBoxes = palette.colors[level].map((color) => (
        <ColorBox key={color.id} background={color[format]} name={color.name} />
    ))
    return (
        <div className={'Palette'}>
            <div className={'slider'}>
                <Navbar
                    level={level}
                    onChange={changeLevel}
                    handleChange={changeFormat}
                />
            </div>

            <div className={'Palette-colors'}>{colorBoxes}</div>
            <footer className={'Palette-footer'}>
                {palette.paletteName}
                <span className={'emoji'}>{palette.emoji}</span>
            </footer>
        </div>
    )

    function changeFormat(value: Format) {
        setFormat(value)
    }

    function changeLevel(newLevel: number | number[]) {
        if (!Array.isArray(newLevel)) setLevel(newLevel)
    }
}
