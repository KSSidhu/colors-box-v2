import chroma from 'chroma-js'
import seedColor from '../seed/seedColor'
export type BasePalette = {
    paletteName: string
    id: string
    emoji: string
    colors: {
        name: string
        color: string
    }[]
}
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

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function findPalette(id: string) {
    return seedColor.find((palette) => palette.id === id)
}

export function generatePalette(id: string): Palette | null {
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
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i])
                    .css()
                    .replace('rgb', 'rgba')
                    .replace(')', ',1.0)'),
            })
        }
    }
    return newPalette
}

function getRange(hexColor: string) {
    const end = '#fff'
    return [chroma(hexColor).darken(1.4).hex(), hexColor, end]
}

function generateScale(hexColor: string, numberOfColors: number) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors)
}
