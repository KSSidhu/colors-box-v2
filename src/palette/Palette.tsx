import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ColorBox from '../colorBox/ColorBox'
import Navbar from '../navbar/Navbar'
import { Format, generatePalette } from '../utils/colorHelper'
import './Palette.css'

export default function Palette() {
    const { paletteId } = useParams()
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState<Format>('hex')
    const palette = generatePalette(paletteId || '')
    if (!palette) return null

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
