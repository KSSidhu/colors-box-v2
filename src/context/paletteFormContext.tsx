import { createContext, useContext, useState } from "react"

export type stepType = "form" | "emoji" | null

type PaletteFormContextType = {
    step: stepType
    openEmojiPicker: () => void
    openNameForm: () => void
    onClose: () => void
}

export const PaletteFormContext = createContext<PaletteFormContextType>({
    step: null,
    openEmojiPicker: () => {},
    openNameForm: () => {},
    onClose: () => {},
})

interface PaletteFormProviderProps {
    children: React.ReactNode
}

export function usePaletteForm() {
    return useContext(PaletteFormContext)
}

export function PaletteFormProvider({ children }: PaletteFormProviderProps) {
    const [step, setStep] = useState<stepType>(null)

    function openEmojiPicker() {
        setStep("emoji")
    }

    function openNameForm() {
        setStep("form")
    }

    function onClose() {
        setStep(null)
    }

    return (
        <PaletteFormContext.Provider
            value={{ openNameForm, openEmojiPicker, onClose, step }}
        >
            {children}
        </PaletteFormContext.Provider>
    )
}
