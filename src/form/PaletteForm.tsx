import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import { useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import DraggableColorBox from './DraggableColorBox'

const drawerWidth = 400

export default function PaletteForm() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('teal')
    const [colors, setColors] = useState(['purple', '#e15674'])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classNames(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant={'h4'}>{'Design Your Palette'}</Typography>
                <div>
                    <Button variant={'contained'} color={'error'}>
                        {'Clear Palette'}
                    </Button>
                    <Button variant={'contained'} color={'primary'}>
                        {'Random Color'}
                    </Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={handleColorChange}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    style={{ backgroundColor: currentColor }}
                    onClick={addNewColor}
                >
                    {'Save Color'}
                </Button>
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colors.map((color) => (
                    <DraggableColorBox color={color} />
                ))}
            </main>
        </div>
    )

    function handleColorChange(newColor: ColorResult) {
        setCurrentColor(newColor.hex)
    }

    function addNewColor() {
        setColors([...colors, currentColor])
    }

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))
