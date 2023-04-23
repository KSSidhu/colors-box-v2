import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Slider from 'rc-slider'
import { useState } from 'react'
import { Format } from '../utils/colorHelper'
import './Navbar.css'

interface NavbarProps {
    level: number
    onChange: (newLevel: number | number[]) => void
    handleChange: (evt: Format) => void
}

function Navbar({ level, onChange, handleChange }: NavbarProps) {
    const [format, setFormat] = useState('hex')

    return (
        <header className={'Navbar'}>
            <div className={'logo'}>
                <a href={'#'}>reactcolorpicker</a>
            </div>
            <div className={'slider-continer'}>
                <span>{`level: ${level}`}</span>
                <div className={'slider'}>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className={'select-container'}>
                <Select onChange={changeFormat} value={format}>
                    <MenuItem value={'hex'}>{'Hex - #ffff'}</MenuItem>
                    <MenuItem value={'rgb'}>
                        {'RGB - rgb(255,255,255)'}
                    </MenuItem>
                    <MenuItem value={'rgba'}>
                        {'RGBA - rgb(255,255,255,1.0)'}
                    </MenuItem>
                </Select>
            </div>
        </header>
    )

    function changeFormat(e: SelectChangeEvent) {
        setFormat(e.target.value)
        handleChange(e.target.value as Format)
    }
}

export default Navbar
