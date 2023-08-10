import { Button } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { BasePalette } from '../utils/colorHelper'
import { NewColor } from './PaletteForm'

interface ColorPickerFormProps {
    paletteIsFull: boolean
    palettes: BasePalette[]
    colors: NewColor[]
    addColor: ({ name, color }: { name: string; color: string }) => void
}

export default function ColorPickerForm({
    addColor,
    palettes,
    colors,
    paletteIsFull,
}: ColorPickerFormProps) {
    const [newColorName, setNewColorName] = useState('')
    const [currentColor, setCurrentColor] = useState('teal')

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
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={handleColorChange}
            />
            <ValidatorForm onSubmit={handleAddColor}>
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
                    disabled={paletteIsFull}
                >
                    {paletteIsFull ? 'Palette Full' : 'Save Color'}
                </Button>
            </ValidatorForm>
        </div>
    )

    function handleAddColor() {
        addColor({
            name: newColorName,
            color: currentColor,
        })
        setNewColorName('')
    }

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === 'newColorName')
            setNewColorName(evt.currentTarget.value)
    }

    function handleColorChange(newColor: ColorResult) {
        setCurrentColor(newColor.hex)
    }
}
