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
import useDisclosure from '../utils/useDisclosure'

interface PaletteMetaFormProps {
    onSubmit: (name: string) => void
}

export default function PaletteMetaForm({ onSubmit }: PaletteMetaFormProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
        <div>
            <Button variant={'outlined'} color={'primary'} onClick={onOpen}>
                {'Open form dialog'}
            </Button>
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby={'form-dialog-title'}
            >
                <DialogTitle id={'form-dialog-title'}>
                    {'Subscribe'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            'To subscribe to this website, please enter your email address here. We will send updates occasionally.'
                        }
                    </DialogContentText>{' '}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color={'primary'}>
                        {'Cancel'}
                    </Button>
                    <Button onClick={onClose} color={'primary'}>
                        {'Subscribe'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === 'newPaletteName')
            setNewPaletteName(evt.currentTarget.value)
    }

    function handleSubmit() {
        onSubmit(newPaletteName)
    }
}
