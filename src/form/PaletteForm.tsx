import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
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
import { FormEvent, useEffect, useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom'
import { usePalettes } from '../context/paletteContext'
import { BasePalette } from '../utils/colorHelper'
import DraggableColorList from './DraggableColorList'

const drawerWidth = 400

export type NewColor = {
    name: string
    color: string
}

export default function PaletteForm() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('teal')
    const [colors, setColors] = useState<NewColor[]>([])
    const [newColorName, setNewColorName] = useState('')
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const [newPaletteName, setNewPaletteName] = useState('')
    const { palettes, savePalette } = usePalettes()!
    const navigate = useNavigate()

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

        ValidatorForm.addValidationRule(
            'isPaletteNameUnique',
            (value: string) => {
                return palettes.every((palette) => {
                    console.log(palette.paletteName, value)
                    return (
                        palette.paletteName.toLowerCase() !==
                        value.toLowerCase()
                    )
                })
            }
        )
    }, [colors, currentColor, palettes])

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
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap>
                        {'Persistent Drawer'}
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label={'Palette Name'}
                            value={newPaletteName}
                            onChange={handleNameChange}
                            name={'newPaletteName'}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                                'Must enter palette name',
                                'That palette name already exists',
                            ]}
                        />
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            type={'submit'}
                        >
                            {'Save Palette'}
                        </Button>
                    </ValidatorForm>
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
                        name={'newColorName'}
                        value={newColorName}
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
                <DraggableColorList
                    colors={colors}
                    deleteColor={deleteColor}
                    handleDragEnd={handleDragEnd}
                    handleDragCancel={handleDragCancel}
                    handleDragStart={handleDragStart}
                />
            </main>
        </div>
    )

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (active.id !== over?.id) {
            setColors((colors) => {
                const oldIndex = colors
                    .map((color) => color.name)
                    .indexOf(active.id.toString())
                const newIndex = colors
                    .map((color) => color.name)
                    .indexOf((over?.id || '').toString())

                return arrayMove(colors, oldIndex, newIndex)
            })
        }

        setActiveId(null)
    }

    function handleDragCancel() {
        setActiveId(null)
    }

    function deleteColor(colorName: string) {
        setColors(colors.filter((color) => color.name !== colorName))
    }

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === 'newColorName')
            setNewColorName(evt.currentTarget.value)

        if (evt.currentTarget.name === 'newPaletteName')
            setNewPaletteName(evt.currentTarget.value)
    }

    function handleColorChange(newColor: ColorResult) {
        setCurrentColor(newColor.hex)
    }

    function addNewColor() {
        setColors([...colors, { name: newColorName, color: currentColor }])
        setNewColorName('')
    }

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function handleSubmit() {
        const newPalette: BasePalette = {
            paletteName: newPaletteName,
            colors: colors,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            emoji: '',
        }
        savePalette(newPalette)
        navigate('/')
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
