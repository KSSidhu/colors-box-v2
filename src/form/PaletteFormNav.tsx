import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Button,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { usePaletteForm } from '../context/paletteFormContext'
import { BasePaletteData } from '../utils/colorHelper'
import { drawerWidth } from './PaletteForm'
import PaletteMetaForm from './PaletteMetaForm'

interface PaletteFormNavProps {
    open: boolean
    onDrawerOpen: () => void
    onSubmit: (newPalette: BasePaletteData) => void
}

export default function PaletteFormNav({
    open,
    onDrawerOpen,
    onSubmit,
}: PaletteFormNavProps) {
    const { openNameForm } = usePaletteForm()!
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color={'default'}
                position={'fixed'}
                sx={{ flexDirection: 'row' }}
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerOpen}
                        sx={{
                            marginLeft: '16px',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {'Create a Palette'}
                    </Typography>
                </Toolbar>
                <div className={classes.navButtons}>
                    <Link to={'/'}>
                        <Button variant={'contained'} color={'secondary'}>
                            {'Go Back'}
                        </Button>
                    </Link>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={openNameForm}
                    >
                        {'Save Palette'}
                    </Button>
                </div>
            </AppBar>
            <PaletteMetaForm onSubmit={onSubmit} />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',

        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    navButtons: {
        marginRight: theme.spacing(3),
        display: 'flex',
        gap: theme.spacing(1),
    },
}))
