import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { usePalettes } from '../context/paletteContext'

interface PaletteMetaFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (name: string) => void
}

export default function PaletteMetaForm({
    isOpen,
    onClose,
    onSubmit,
}: PaletteMetaFormProps) {
    const [newPaletteName, setNewPaletteName] = useState('')
    const { palettes } = usePalettes()!

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
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby={'form-dialog-title'}
        >
            <DialogTitle id={'form-dialog-title'}>
                {'Enter a Palette Name'}
            </DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    label={'Palette Name'}
                    value={newPaletteName}
                    onChange={handleNameChange}
                    fullWidth
                    margin={'normal'}
                    name={'newPaletteName'}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={[
                        'Must enter palette name',
                        'That palette name already exists',
                    ]}
                />

                <DialogContent>
                    <DialogContentText>
                        {'Please enter a unique name for your palette.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color={'primary'}>
                        {'Cancel'}
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        type={'submit'}
                    >
                        {'Save Palette'}
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    )

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === 'newPaletteName')
            setNewPaletteName(evt.currentTarget.value)
    }

    function handleSubmit() {
        onSubmit(newPaletteName)
    }
}
