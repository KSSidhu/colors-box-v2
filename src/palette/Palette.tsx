import { makeStyles } from '@mui/styles'
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ColorBox from '../colorBox/ColorBox'
import Navbar from '../navbar/Navbar'
import { Format, generatePalette } from '../utils/colorHelper'

export default function Palette() {
    const { paletteId } = useParams()
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState<Format>('hex')
    const classes = useStyles()
    const palette = generatePalette(paletteId || '')
    if (!palette) return null

    const colorBoxes = palette.colors[level].map((color) => (
        <ColorBox
            key={color.id}
            background={color[format]}
            name={color.name}
            moreUrl={`/palette/${paletteId}/${color.id}`}
        />
    ))
    return (
        <div className={classes.palette}>
            <div className={'slider'}>
                <Navbar
                    level={level}
                    onChange={changeLevel}
                    handleChange={changeFormat}
                />
            </div>

            <div className={classes.paletteColors}>{colorBoxes}</div>
            <footer className={classes.paletteFooter}>
                {palette.paletteName}
                <span className={classes.emoji}>{palette.emoji}</span>
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

const useStyles = makeStyles({
    palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    paletteColors: {
        height: '90%',
    },
    paletteFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '5vh',
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: '1.5rem',
        margin: '0 1rem',
    },
})
