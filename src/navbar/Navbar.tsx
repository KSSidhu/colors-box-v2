import Slider from 'rc-slider'
import './Navbar.css'

interface NavbarProps {
    level: number
    onChange: (newLevel: number | number[]) => void
}

function Navbar({ level, onChange }: NavbarProps) {
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
        </header>
    )
}

export default Navbar
