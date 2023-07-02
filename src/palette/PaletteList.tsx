import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { BasePalette } from '../utils/colorHelper'
import MiniPalette from './MiniPalette'

interface PaletteListProps {
    palettes: BasePalette[]
}

function PaletteList({ palettes }: PaletteListProps) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>{'React Colors'}</h1>
                    <Button href={'/palette/new'} variant={'contained'}>
                        {'Create New Palette'}
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

const useStyles = makeStyles({
    root: {
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
    },
})

export default PaletteList
