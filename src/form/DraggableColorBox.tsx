import { makeStyles } from '@mui/styles'

interface DraggableColorBoxProps {
    color: string
}

export default function DraggableColorBox({ color }: DraggableColorBoxProps) {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            {color}
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
