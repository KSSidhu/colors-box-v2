import { createContext, ReactNode, useContext, useState } from 'react'
import seedColor from '../seed/seedColor'
import { BasePalette } from '../utils/colorHelper'

type PaletteContextType = {
    palettes: BasePalette[]
    savePalette: (newPalette: BasePalette) => void
}

export const PaletteContext = createContext<PaletteContextType | null>(null)

interface PaletteProviderProps {
    children: ReactNode
}

export function usePalettes() {
    return useContext(PaletteContext)
}

export function PaletteProvider({ children }: PaletteProviderProps) {
    const [palettes, setPalettes] = useState(seedColor)

    function savePalette(newPalette: BasePalette) {
        console.log(newPalette)
    }

    return (
        <PaletteContext.Provider
            value={{
                palettes,
                savePalette,
            }}
        >
            {children}
        </PaletteContext.Provider>
    )
}
