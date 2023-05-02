import { Link } from 'react-router-dom'
import { BasePalette } from '../utils/colorHelper'

interface PaletteListProps {
    palettes: BasePalette[]
}

function PaletteList({ palettes }: PaletteListProps) {
    return (
        <div>
            <h1>{'React Colors'}</h1>
            {palettes.map((palette) => (
                <p>
                    <Link to={`/palette/${palette.id}`}>
                        {palette.paletteName}
                    </Link>
                </p>
            ))}
        </div>
    )
}

export default PaletteList
