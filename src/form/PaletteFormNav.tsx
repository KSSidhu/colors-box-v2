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
import { FormEvent, useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { usePalettes } from '../context/paletteContext'
import { drawerWidth } from './PaletteForm'

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
    const [newPaletteName, setNewPaletteName] = useState('')
    const { palettes } = usePalettes()!
    const classes = useStyles()

    useEffect(() => {
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
    }, [palettes])

    return (
        <>
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
                        <Link to={'/'}>
                            <Button variant={'contained'} color={'secondary'}>
                                {'Go Back'}
                            </Button>
                        </Link>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
        </>
    )

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === 'newPaletteName')
            setNewPaletteName(evt.currentTarget.value)
    }

    function handleSubmit() {
        onSubmit(newPaletteName)
    }
}

const useStyles = makeStyles((theme) => ({
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
}))
