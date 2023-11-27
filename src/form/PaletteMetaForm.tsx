import Picker from "@emoji-mart/react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import { usePalettes } from "../context/paletteContext"
import { stepType, usePaletteForm } from "../context/paletteFormContext"
import { BasePaletteData } from "../utils/colorHelper"

interface PaletteMetaFormProps {
    onSubmit: (newPalette: BasePaletteData) => void
}

export default function PaletteMetaForm({ onSubmit }: PaletteMetaFormProps) {
    const [newPaletteName, setNewPaletteName] = useState("")
    const { palettes } = usePalettes()
    const { step, openEmojiPicker, onClose } = usePaletteForm()

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value: string) => {
            return palettes.every((palette) => {
                console.log(palette.paletteName, value)
                return palette.paletteName.toLowerCase() !== value.toLowerCase()
            })
        })
    }, [palettes])

    return (
        <>
            <Dialog open={checkStep("emoji")} onClose={onClose}>
                <DialogTitle id={"form-dialog-title"}>
                    {"Choose a Palette Emoji"}
                </DialogTitle>

                <Picker onEmojiSelect={handleSubmit} theme={"light"} />
            </Dialog>
            <Dialog
                open={checkStep("form")}
                onClose={onClose}
                aria-labelledby={"form-dialog-title"}
            >
                <DialogTitle id={"form-dialog-title"}>
                    {"Enter a Palette Name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Please enter a unique name for your palette."}
                    </DialogContentText>
                    <ValidatorForm onSubmit={openEmojiPicker}>
                        <TextValidator
                            label={"Palette Name"}
                            value={newPaletteName}
                            onChange={handleNameChange}
                            fullWidth
                            margin={"normal"}
                            name={"newPaletteName"}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Must enter palette name",
                                "That palette name already exists",
                            ]}
                        />

                        <DialogActions>
                            <Button onClick={onClose} color={"primary"}>
                                {"Cancel"}
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                type={"submit"}
                            >
                                {"Save Palette"}
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </>
    )

    function checkStep(formStep: stepType) {
        return step === formStep
    }

    function handleNameChange(evt: FormEvent<HTMLInputElement>) {
        if (evt.currentTarget.name === "newPaletteName")
            setNewPaletteName(evt.currentTarget.value)
    }

    function handleSubmit(emoji: any) {
        onSubmit({ paletteName: newPaletteName, emoji: emoji.native as string })
    }
}
