import chroma from 'chroma-js'
export type BasePalette = {
    paletteName: string
    id: string
    emoji: string
    colors: {
        name: string
        color: string
    }[]
}

export type BasePaletteData = Partial<BasePalette>

export type Format = 'hex' | 'rgb' | 'rgba'

export type Palette = {
    paletteName: string
    id: string
    emoji: string
    colors: { [shade: number]: Color[] }
}

export type Color = {
    id: string
    name: string
    hex: string
    rgb: string
    rgba: string
}

export const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

export function getRange(hexColor: string) {
    const end = '#fff'
    return [chroma(hexColor).darken(1.4).hex(), hexColor, end]
}

export function generateScale(hexColor: string, numberOfColors: number) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors)
}
