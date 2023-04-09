import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './ColorBox.css'

interface ColorBoxProps {
    background: string
    name: string
}

export default function ColorBox({ name, background }: ColorBoxProps) {
    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className={'ColorBox'}>
                <div
                    style={{ background }}
                    className={`copy-overlay ${showOverlay && 'show'}`}
                />
                <div className={`copy-msg ${showOverlay && 'show'}`}>
                    <h1>{'COPIED'}</h1>
                    <p>{background}</p>
                </div>
                <div className={'copy-container'}>
                    <div className={'box-content'}>
                        <span>{name}</span>
                    </div>
                    <button className={'copy-button'}>{'Copy'}</button>
                </div>
                <span className={'see-more'}>{'More'}</span>
            </div>
        </CopyToClipboard>
    )

    function changeCopyState() {
        setShowOverlay(true)
        setTimeout(() => setShowOverlay(false), 1500)
    }
}
