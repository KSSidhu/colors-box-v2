import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ColorBox from '../colorBox/ColorBox'
import Navbar from '../navbar/Navbar'
import PaletteFooter from '../palette/PaletteFooter'
import { Color, Format, generatePalette } from '../utils/colorHelper'

export default function SingleColorPalette() {
    const { colorId, paletteId } = useParams()
    const palette = generatePalette(paletteId || '')
    const [format, setFormat] = useState<Format>('hex')
    const classes = useStyles()
    if (!palette) return null

    const shades = generateShades()
    const colorBoxes = shades.map((color) => (
        <ColorBox key={color.id} name={color.name} background={color[format]} />
    ))

    return (
        <div className={classes.palette}>
            <Navbar handleChange={changeFormat} />
            <div className={classes.paletteColors}>{colorBoxes}</div>
            <PaletteFooter
                paletteName={palette.paletteName}
                emoji={palette.emoji}
            />
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

    function changeFormat(value: Format) {
        setFormat(value)
    }
}

const useStyles = makeStyles({
    palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    paletteColors: {
        height: '90%',
    },
})
