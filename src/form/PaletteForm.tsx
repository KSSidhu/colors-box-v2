import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePalettes } from '../context/paletteContext'
import { BasePalette } from '../utils/colorHelper'
import ColorPickerForm from './ColorPickerForm'
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'

export const drawerWidth = 400

export type NewColor = {
    name: string
    color: string
}

const MAX_COLORS = 20

export default function PaletteForm() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const { palettes, savePalette } = usePalettes()!
    const [colors, setColors] = useState<NewColor[]>(palettes[0].colors)
    const navigate = useNavigate()
    const paletteIsFull = colors.length >= MAX_COLORS

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                onDrawerOpen={handleDrawerOpen}
                onSubmit={handleSubmit}
            />
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
                    <Button
                        variant={'contained'}
                        color={'error'}
                        onClick={clearPalette}
                    >
                        {'Clear Palette'}
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        disabled={paletteIsFull}
                        onClick={addRandomColor}
                    >
                        {'Random Color'}
                    </Button>
                </div>
                <ColorPickerForm
                    palettes={palettes}
                    colors={colors}
                    paletteIsFull={paletteIsFull}
                    addColor={addNewColor}
                />
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

    function clearPalette() {
        setColors([])
    }

    function addRandomColor() {
        const allColors = palettes.map((p) => p.colors).flat()
        const rand = Math.floor(Math.random() * allColors.length)

        const randomColor = allColors[rand]
        setColors((prevColors) => [...prevColors, randomColor])
    }

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

    function addNewColor(newColor: { name: string; color: string }) {
        setColors([...colors, newColor])
    }

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function handleSubmit(newPaletteName: string) {
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
