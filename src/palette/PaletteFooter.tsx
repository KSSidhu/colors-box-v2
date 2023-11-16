import { makeStyles } from "@mui/styles"

interface PaletteFooterProps {
    paletteName: string
    emoji: string
}

export default function PaletteFooter({ paletteName, emoji }: PaletteFooterProps) {
    const classes = useStyles()

    return (
        <footer className={classes.paletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

const useStyles = makeStyles({
    paletteFooter: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white",
        height: "5vh",
        fontWeight: "bold",
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem",
    },
})
