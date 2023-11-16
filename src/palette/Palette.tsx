import { makeStyles } from "@mui/styles"
import "rc-slider/assets/index.css"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ColorBox from "../colorBox/ColorBox"
import { usePalettes } from "../context/paletteContext"
import Navbar from "../navbar/Navbar"
import { Format } from "../utils/colorHelper"
import PaletteFooter from "./PaletteFooter"

export default function Palette() {
    const { paletteId } = useParams()
    const context = usePalettes()!
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState<Format>("hex")
    const classes = useStyles()
    if (!context) return null

    const { generatePalette } = context
    const palette = generatePalette(paletteId || "")
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
            <div className={"slider"}>
                <Navbar
                    level={level}
                    onChange={changeLevel}
                    handleChange={changeFormat}
                />
            </div>

            <div className={classes.paletteColors}>{colorBoxes}</div>
            <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    paletteColors: {
        height: "90%",
    },
})
