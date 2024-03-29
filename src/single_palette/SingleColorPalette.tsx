import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/system"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import ColorBox from "../colorBox/ColorBox"
import { usePalettes } from "../context/paletteContext"
import Navbar from "../navbar/Navbar"
import PaletteFooter from "../palette/PaletteFooter"
import { Color, Format } from "../utils/colorHelper"

export default function SingleColorPalette() {
    const { colorId, paletteId } = useParams()
    const context = usePalettes()
    const [format, setFormat] = useState<Format>("hex")
    const classes = useStyles()
    if (!context) return null

    const { generatePalette } = context
    const palette = generatePalette(paletteId || "")

    if (!palette) return null

    const shades = generateShades()
    const colorBoxes = shades.map((color) => (
        <ColorBox
            key={color.name}
            name={color.name}
            background={color[format]}
            viewingSinglePalette
        />
    ))

    return (
        <div className={classes.palette}>
            <Navbar handleChange={changeFormat} />
            <div className={classes.paletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${paletteId}`} className={classes.backButton}>
                        {"GO Back"}
                    </Link>
                </div>
            </div>
            <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
        </div>
    )

    function generateShades() {
        let shades: Color[] = []
        let allColors = palette!.colors

        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter((color) => color.id === colorId))
        }

        // palettes start from shade[50] (aka white) which we can ignore
        return shades.slice(1)
    }

    function changeFormat(value: Format) {
        setFormat(value)
    }
}

const useStyles = makeStyles<Theme>((theme) => ({
    palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    paletteColors: {
        height: "90%",
    },
    goBack: {
        background: "black",
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        marginBottom: "-3.5px",
        [theme.breakpoints.down("lg")]: {
            width: "25%",
            height: "33.3333%",
        },
        [theme.breakpoints.down("md")]: {
            width: "50%",
            height: "20%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "10%",
        },
    },
    backButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        border: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        color: "white",
        textTransform: "uppercase",
        textDecoration: "none",
    },
}))
