import { CSSProperties } from "@mui/styles"

function styleIf(condition: boolean, styles: CSSProperties) {
    return condition ? styles : {}
}

export default styleIf
