import { Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import bg from "../assets/bg.svg"
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
                    <h1 className={classes.header}>{"React Colors"}</h1>
                    <Button component={Link} to={"/palette/new"} variant={"contained"}>
                        {"Create New Palette"}
                    </Button>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map((palette) => (
                        <CSSTransition key={palette.id} classNames={"fade"} timeout={500}>
                            <MiniPalette {...palette} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    "@global": {
        ".fade-exit": {
            opacity: 1,
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out",
        },
    },
    root: {
        backgroundColor: "#394bad",
        backgroundImage: `url(${bg})`,
        /* background by SVGBackgrounds.com */
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll",
    },
    header: {
        fontSize: "2rem",
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
