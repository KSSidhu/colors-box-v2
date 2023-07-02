import { makeStyles } from '@mui/styles'

interface DraggableColorBoxProps {
    color: string
    name: string
}

export default function DraggableColorBox({
    name,
    color,
}: DraggableColorBoxProps) {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            {name}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        marginBottom: '-3.5px',
    },
})
