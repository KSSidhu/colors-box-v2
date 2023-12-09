import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DeleteOutlined } from "@mui/icons-material"
import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import chroma from "chroma-js"
import { CSSProperties } from "react"

interface DraggableColorBoxProps {
    color: string
    name: string
    deleteColor: (colorName: string) => void
}

export default function DraggableColorBox({
    name,
    color,
    deleteColor,
}: DraggableColorBoxProps) {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: name,
    })

    const isDark = chroma(color).luminance() <= 0.06
    const classes = useStyles({ isDark })

    const styles: CSSProperties = {
        background: color,
        transform: CSS.Translate.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            className={classes.root}
            style={styles}
            {...attributes}
            {...listeners}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteOutlined className={classes.icon} onClick={handleDelete} />
            </div>
        </div>
    )

    function handleDelete() {
        deleteColor(name)
    }
}

interface StyleProps {
    isDark: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        marginBottom: "-6.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)",
        },
        [theme.breakpoints.down("lg")]: {
            width: "25%",
            height: "20%",
        },
        [theme.breakpoints.down("md")]: {
            width: "50%",
            height: "10%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "5%",
        },
    },
    boxContent: ({ isDark }) => ({
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: isDark ? "white" : "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    }),
    icon: ({ isDark }) => ({
        color: isDark ? "white" : "black",
        transition: "all 0.3s ease-in-out",
    }),
}))
