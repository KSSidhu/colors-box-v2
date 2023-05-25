import { makeStyles } from '@mui/styles'
import { BasePalette } from '../utils/colorHelper'

type MiniPaletteProps = BasePalette

function MiniPalette(props: MiniPaletteProps) {
    const { paletteName, emoji, colors } = props
    const classes = useStyles()

    const minicolorBoxes = colors.map((color) => (
        <div
            key={`${color.name}-${color.color}`}
            className={classes.miniBox}
            style={{ backgroundColor: color.color }}
        />
    ))

    return (
        <div className={classes.root}>
            <div className={classes.colours}>
                {/* Mini colour boxes*/}
                {minicolorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    colours: {
        backgroundColor: '#dae1e4',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        paddingBottom: '0.75rem',
        fontSize: '1rem',
        position: 'relative',
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem',
    },
    miniBox: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px',
    },
})

export default MiniPalette
