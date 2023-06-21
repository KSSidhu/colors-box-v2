import { useParams } from 'react-router-dom'
import ColorBox from '../colorBox/ColorBox'
import { Color, generatePalette } from '../utils/colorHelper'

export default function SingleColorPalette() {
    const { colorId, paletteId } = useParams()
    const palette = generatePalette(paletteId || '')
    if (!palette) return null

    const shades = generateShades()
    const colorBoxes = shades.map((color) => (
        <ColorBox key={color.id} name={color.name} background={color.hex} />
    ))

    return (
        <div className={'Palette'}>
            <h1>{'Single Color Palette'}</h1>
            <div className={'Palette-colors'}>{colorBoxes}</div>
        </div>
    )

    function generateShades() {
        let shades: Color[] = []
        let allColors = palette!.colors

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter((color) => color.id === colorId)
            )
        }

        // palettes start from shade[50] (aka white) which we can ignore
        return shades.slice(1)
    }
}
