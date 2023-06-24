import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import styleIf from '../utils/styleIf'
import './ColorBox.css'

interface ColorBoxProps {
    background: string
    name: string
    moreUrl?: string
}

export default function ColorBox({ name, background, moreUrl }: ColorBoxProps) {
    const [showOverlay, setShowOverlay] = useState(false)

    const classes = useStyles({ show: showOverlay })

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className={classes.colorBox}>
                <div style={{ background }} className={classes.copyOverlay} />
                <div className={classes.copyMsg}>
                    <h1>{'COPIED'}</h1>
                    <p>{background}</p>
                </div>
                <div className={'copy-container'}>
                    <div className={classes.boxContent}>
                        <span>{name}</span>
                    </div>
                    <button className={classes.copyButton}>{'Copy'}</button>
                </div>
                {moreUrl && (
                    <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                        <span className={classes.seeMore}>{'More'}</span>
                    </Link>
                )}
            </div>
        </CopyToClipboard>
    )

    function changeCopyState() {
        setShowOverlay(true)
        setTimeout(() => setShowOverlay(false), 1500)
    }
}

interface StyleProps {
    show: boolean
}

const useStyles = makeStyles({
    colorBox: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        marginBottom: '-3.5px',
        '&:hover button': {
            opacity: 1,
            transition: '0.5s',
        },
    },
    copyButton: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        opacity: 0,
    },
    seeMore: {
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        color: 'white',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase',
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: 'black',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    copyOverlay: ({ show }: StyleProps) => ({
        opacity: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)',
        ...styleIf(show, {
            opacity: 1,
            transform: 'scale(50)',
            zIndex: 10,
            position: 'absolute',
        }),
    }),
    copyMsg: ({ show }: StyleProps) => ({
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        transform: 'scale(0.1)',
        opacity: 0,
        color: 'white',
        flexDirection: 'column',
        '& h1': {
            fontWeight: 400,
            textShadow: '1px 2px black',
            background: 'rgba(255, 255, 255, 0.3)',
            width: '100%',
            textAlign: 'center',
            marginBottom: 0,
            padding: '1rem',
            textTransform: 'uppercase',
        },
        '& p': {
            fontSize: '2rem',
            fontWeight: 100,
        },
        ...styleIf(show, {
            opacity: 1,
            transform: 'scale(1)',
            zIndex: 25,
            transition: 'all 0.4s ease-in-out',
            transitionDelay: '0.3s',
        }),
    }),
})
