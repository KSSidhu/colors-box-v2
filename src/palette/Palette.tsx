import ColorBox from '../colorBox/ColorBox'
import { Palette } from '../seed/seedColor'
import './Palette.css'

interface PaletteProps {
    palette: Palette
}

export default function Palette(props: PaletteProps) {
    const { palette } = props

    const colorBoxes = palette.colors.map((color) => (
        <ColorBox background={color.color} name={color.name} />
    ))
    return (
        <div className={'Palette'}>
            <div className={'Palette-colors'}>{colorBoxes}</div>
        </div>
    )
}
