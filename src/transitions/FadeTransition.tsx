import { useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import "./FadeTransition.css"

interface Props {
    children: React.ReactNode
}

export default function FadeTransition({ children }: Props) {
    const location = useLocation()
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames={"fade"} timeout={500}>
                <div className={"page"}>{children}</div>
            </CSSTransition>
        </TransitionGroup>
    )
}
