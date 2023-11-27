import chroma from "chroma-js"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import seedColor from "../seed/seedColor"
import { BasePalette, generateScale, levels, Palette } from "../utils/colorHelper"

type PaletteContextType = {
    palettes: BasePalette[]
    savePalette: (newPalette: BasePalette) => void
    deletePalette: (id: string) => void
    generatePalette: (id: string) => Palette | null
}

export const PaletteContext = createContext<PaletteContextType>({
    palettes: [],
    savePalette: () => {},
    deletePalette: (id: string) => {},
    generatePalette: (id: string) => null,
})

interface PaletteProviderProps {
    children: ReactNode
}

export function usePalettes() {
    return useContext(PaletteContext)
}

export function PaletteProvider({ children }: PaletteProviderProps) {
    const paletteValue = window.localStorage.getItem("palettes")
    const savedPalettes = paletteValue ? JSON.parse(paletteValue) : undefined
    const [palettes, setPalettes] = useState<BasePalette[]>(savedPalettes || seedColor)

    useEffect(() => {
        syncLocalStorage()
    }, [palettes])

    function findPalette(id: string) {
        return palettes.find((palette) => palette.id === id)
    }

    function generatePalette(id: string): Palette | null {
        const starterPalette = findPalette(id)
        if (!starterPalette) return null
        let newPalette: Palette = {
            paletteName: starterPalette.paletteName,
            id: starterPalette.id,
            emoji: starterPalette.emoji,
            colors: {},
        }

        for (let level of levels) {
            newPalette.colors[level] = []
        }

        for (let color of starterPalette.colors) {
            let scale = generateScale(color.color, 10).reverse()
            for (let i in scale) {
                newPalette.colors[levels[i]].push({
                    name: `${color.name} ${levels[i]}`,
                    id: color.name.toLowerCase().replace(/ /g, "-"),
                    hex: scale[i],
                    rgb: chroma(scale[i]).css(),
                    rgba: chroma(scale[i])
                        .css()
                        .replace("rgb", "rgba")
                        .replace(")", ",1.0)"),
                })
            }
        }
        return newPalette
    }

    function savePalette(newPalette: BasePalette) {
        setPalettes([...palettes, newPalette])
    }

    function deletePalette(id: string) {
        setPalettes((prevState) => prevState.filter((palette) => palette.id !== id))
    }

    function syncLocalStorage() {
        window.localStorage.setItem("palettes", JSON.stringify(palettes))
    }

    return (
        <PaletteContext.Provider
            value={{
                palettes,
                savePalette,
                generatePalette,
                deletePalette,
            }}
        >
            {children}
        </PaletteContext.Provider>
    )
}
