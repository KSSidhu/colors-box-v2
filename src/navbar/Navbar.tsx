import CloseIcon from "@mui/icons-material/Close"
import { IconButton, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Slider from "rc-slider"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Format } from "../utils/colorHelper"

interface NavbarProps {
    level?: number
    onChange?: (newLevel: number | number[]) => void
    handleChange: (evt: Format) => void
}

function Navbar({ level, onChange, handleChange }: NavbarProps) {
    const [format, setFormat] = useState("hex")
    const [showSnackbar, setShowSnackbar] = useState(false)
    const classes = useStyles()

    return (
        <header className={classes.navbar}>
            <div className={classes.logo}>
                <Link to={"/"}>{"reactcolorpicker"}</Link>
            </div>
            {level && onChange && (
                <div>
                    <span>{`level: ${level}`}</span>
                    <div className={classes.slider}>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onChange={onChange}
                        />
                    </div>
                </div>
            )}
            <div className={classes.selectContainer}>
                <Select onChange={changeFormat} value={format}>
                    <MenuItem value={"hex"}>{"Hex - #ffff"}</MenuItem>
                    <MenuItem value={"rgb"}>{"RGB - rgb(255,255,255)"}</MenuItem>
                    <MenuItem value={"rgba"}>{"RGBA - rgb(255,255,255,1.0)"}</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={showSnackbar}
                autoHideDuration={1000}
                onClose={closeSnackbar}
                message={
                    <span
                        id={"message-id"}
                    >{`Format changed to ${format.toUpperCase()}`}</span>
                }
                ContentProps={{ "aria-describedby": "message-id" }}
                action={
                    <IconButton
                        onClick={closeSnackbar}
                        color={"inherit"}
                        aria-label={"close"}
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

const useStyles = makeStyles({
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh",
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black",
        },
    },

    slider: {
        width: "340px",
        margin: "0px",
        display: "inline-block",
        "& .rc-slider-rail": {
            height: "8px",
        },
        "& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover":
            {
                backgroundColor: "green",
                outline: "none",
                border: "2px solid green",
                boxShadow: "none",
                width: "13px",
                height: "13px",
                marginLeft: "-7px",
                marginTop: "-3px",
            },
        "& .rc-slider-track": {
            backgroundColor: "transparent",
        },
    },

    selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem",
    },
})

export default Navbar
