import { makeStyles } from '@mui/styles'

function MiniPalette() {
    const classes = useStyles()
    return (
        <div className={classes.main}>
            <h1>{'Mini Palette'}</h1>
        </div>
    )
}

const useStyles = makeStyles({
    main: {
        backgrounColor: 'purple',
        border: '3px solid teal',
    },
})

export default MiniPalette
