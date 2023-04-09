import './ColorBox.css'

interface ColorBoxProps {
    background: string
    name: string
}

export default function ColorBox({ name, background }: ColorBoxProps) {
    return (
        <div style={{ background }} className={'ColorBox'}>
            <div className={'copy-container'}>
                <div className={'box-content'}>
                    <span>{name}</span>
                </div>
                <button className={'copy-button'}>{'Copy'}</button>
            </div>
            <span className={'see-more'}>{'More'}</span>
        </div>
    )
}
