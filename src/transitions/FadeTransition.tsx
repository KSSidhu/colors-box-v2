import { makeStyles } from "@mui/styles"
import { useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface Props {
    children: React.ReactNode
}

export default function FadeTransition({ children }: Props) {
    const classes = useStyles()
    const location = useLocation()
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames={"fade"} timeout={500}>
                <div className={classes.page}>{children}</div>
            </CSSTransition>
        </TransitionGroup>
    )
}

const useStyles = makeStyles({
    page: {
        height: "100vh",
        width: "100%",
        position: "fixed",
    },
})
