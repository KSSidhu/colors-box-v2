import { createTheme, Theme, ThemeProvider } from "@mui/material/styles"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { PaletteProvider } from "./context/paletteContext"
import PaletteForm from "./form/PaletteForm"
import Palette from "./palette/Palette"
import PaletteList from "./palette/PaletteList"
import SingleColorPalette from "./single_palette/SingleColorPalette"
import FadeTransition from "./transitions/FadeTransition"

declare module "@mui/styles/defaultTheme" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
    interface DefaultTheme extends Theme {}
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <FadeTransition>
                <PaletteList />
            </FadeTransition>
        ),
    },
    {
        path: "/palette/new",
        element: (
            <FadeTransition>
                <PaletteForm />
            </FadeTransition>
        ),
    },
    {
        path: "/palette/:paletteId",
        element: (
            <FadeTransition>
                <Palette />
            </FadeTransition>
        ),
    },
    {
        path: "/palette/:paletteId/:colorId",
        element: (
            <FadeTransition>
                <SingleColorPalette />
            </FadeTransition>
        ),
    },
    {
        path: "*",
        element: (
            <FadeTransition>
                <PaletteList />
            </FadeTransition>
        ),
    },
])

function App() {
    const theme = createTheme()
    return (
        <ThemeProvider theme={theme}>
            <PaletteProvider>
                <RouterProvider router={router} />
            </PaletteProvider>
        </ThemeProvider>
    )
}

export default App
