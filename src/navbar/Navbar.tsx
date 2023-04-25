import CloseIcon from '@mui/icons-material/Close'
import {
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
} from '@mui/material'
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
    const [showSnackbar, setShowSnackbar] = useState(false)

    return (
        <header className={'Navbar'}>
            <div className={'logo'}>
                <a href={'#'}>reactcolorpicker</a>
            </div>
            <div className={'slider-container'}>
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
            <div className={'select-container '}>
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
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={showSnackbar}
                autoHideDuration={1000}
                onClose={closeSnackbar}
                message={
                    <span
                        id={'message-id'}
                    >{`Format changed to ${format.toUpperCase()}`}</span>
                }
                ContentProps={{ 'aria-describedby': 'message-id' }}
                action={
                    <IconButton
                        onClick={closeSnackbar}
                        color={'inherit'}
                        aria-label={'close'}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </header>
    )

    function changeFormat(e: SelectChangeEvent) {
        setFormat(e.target.value)
        handleChange(e.target.value as Format)
        setShowSnackbar(true)
    }

    function closeSnackbar() {
        setShowSnackbar(false)
    }
}

export default Navbar
