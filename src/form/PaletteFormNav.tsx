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
import { drawerWidth } from './PaletteForm'
import PaletteMetaForm from './PaletteMetaForm'

interface PaletteFormNavProps {
    open: boolean
    onDrawerOpen: () => void
    onSubmit: (newPaletteName: string) => void
}

export default function PaletteFormNav({
    open,
    onDrawerOpen,
    onSubmit,
}: PaletteFormNavProps) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar color={'default'} position="fixed">
                <Toolbar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    {!open && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onDrawerOpen}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap>
                        {'Create a Palette'}
                    </Typography>
                    <div className={classes.navButtons}>
                        {/*        */}
                        <PaletteMetaForm onSubmit={onSubmit} />
                        <Link to={'/'}>
                            <Button variant={'contained'} color={'secondary'}>
                                {'Go Back'}
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navButtons: {
        display: 'flex',
    },
}))
