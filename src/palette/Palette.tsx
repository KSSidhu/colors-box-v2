import ColorBox from '../colorBox/ColorBox'
import { Palette } from '../utils/colorHelper'
import './Palette.css'

interface PaletteProps {
    palette: Palette
}

export default function Palette(props: PaletteProps) {
    const { palette } = props

    const colorBoxes = palette.colors[300].map((color) => (
        <ColorBox background={color.hex} name={color.name} />
    ))
    return (
        <div className={'Palette'}>
            <div className={'Palette-colors'}>{colorBoxes}</div>
        </div>
    )
}
