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
import { FormEvent, useContext, useEffect, useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { PaletteContext } from '../context/paletteContext'
import { BasePalette } from '../utils/colorHelper'
import DraggableColorBox from './DraggableColorBox'

const drawerWidth = 400

type NewColor = {
    name: string
    color: string
}

export default function PaletteForm() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('teal')
    const [colors, setColors] = useState<NewColor[]>([])
    const [newName, setNewName] = useState('')
    const { savePalette } = useContext(PaletteContext)!

    useEffect(() => {
        ValidatorForm.addValidationRule(
            'isColorNameUnique',
            (value: string) => {
                return colors.every(
                    (color) => color.name.toLowerCase() !== value.toLowerCase()
                )
            }
        )

        ValidatorForm.addValidationRule('isColorUnique', (_) => {
            return colors.every((color) => color.color !== currentColor)
        })
    }, [colors, currentColor])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color={'default'}
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
                        {'Persistent Drawer'}
                    </Typography>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={handleSubmit}
                    >
                        {'Save Palette'}
                    </Button>
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
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        name={'color'}
                        value={newName}
                        onChange={handleNameChange}
                        validators={[
                            'required',
                            'isColorNameUnique',
                            'isColorUnique',
                        ]}
                        errorMessages={[
                            'Color name is required',
                            'Color name must be unique',
                            'Cannot add an existing color',
                        ]}
                    />
                    <Button
                        variant={'contained'}
                        type={'submit'}
                        color={'primary'}
                        style={{ backgroundColor: currentColor }}
                    >
                        {'Save Color'}
                    </Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colors.map((color) => (
                    <DraggableColorBox
                        key={color.name}
                        color={color.color}
                        name={color.name}
                    />
                ))}
            </main>
        </div>
    )

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        setNewName(evt.currentTarget.value)
    }

    function handleColorChange(newColor: ColorResult) {
        setCurrentColor(newColor.hex)
    }

    function addNewColor() {
        setColors([...colors, { name: newName, color: currentColor }])
        setNewName('')
    }

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function handleSubmit() {
        const newPalette: BasePalette = {
            paletteName: 'New Test Palette',
            colors: colors,
            id: 'new-test-palette',
            emoji: '',
        }
        savePalette(newPalette)
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
