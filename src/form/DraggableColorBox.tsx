import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DeleteOutlined } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
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
    const classes = useStyles()

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

const useStyles = makeStyles({
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
    },
    boxContent: {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    icon: {
        color: "rgba(0,0,0,0.5)",
        transition: "all 0.3s ease-in-out",
    },
})
