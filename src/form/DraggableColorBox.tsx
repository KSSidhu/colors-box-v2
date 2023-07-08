import { DeleteOutlined } from '@mui/icons-material'
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
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteOutlined className={classes.icon} />
            </div>
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
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)',
        },
    },
    boxContent: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    icon: {
        color: 'rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out',
    },
})
