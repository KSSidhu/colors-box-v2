import { Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { PaletteContext } from "../context/paletteContext"
import MiniPalette from "./MiniPalette"

function PaletteList() {
    const context = useContext(PaletteContext)
    const classes = useStyles()

    if (!context) return null

    const { palettes } = context
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>{"React Colors"}</h1>
                    <Button component={Link} to={"/palette/new"} variant={"contained"}>
                        {"Create New Palette"}
                    </Button>
                </nav>
                <div className={classes.palettes}>
                    {palettes.map((palette) => (
                        <MiniPalette key={palette.id} {...palette} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [theme.breakpoints.down("xl")]: {
            width: "80%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "75%",
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem",
        },
    },
}))

export default PaletteList
