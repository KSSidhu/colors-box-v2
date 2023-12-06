import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material"
import { blue, red } from "@mui/material/colors"
import { usePalettes } from "../context/paletteContext"

interface Props {
    deletingId?: string
    isOpen: boolean
    onClose: () => void
}

export default function DeletePaletteDialog({ deletingId, isOpen, onClose }: Props) {
    const { deletePalette } = usePalettes()

    return (
        <Dialog open={isOpen}>
            <DialogTitle>{"Delete this palette?"}</DialogTitle>
            <List>
                <ListItemButton onClick={removePalette}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                            <CheckIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{"Delete"}</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={onClose}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                            <CloseIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{"Cancel"}</ListItemText>
                </ListItemButton>
            </List>
        </Dialog>
    )

    function removePalette() {
        if (deletingId) deletePalette(deletingId)
        onClose()
    }
}
