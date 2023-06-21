import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Palette from './palette/Palette'
import PaletteList from './palette/PaletteList'
import seedColor from './seed/seedColor'
import SingleColorPalette from './single_palette/SingleColorPalette'

const router = createBrowserRouter([
    {
        path: '/',
        element: <PaletteList palettes={seedColor} />,
    },
    {
        path: '/palette/:paletteId',
        element: <Palette />,
    },
    {
        path: '/palette/:paletteId/:colorId',
        element: <SingleColorPalette />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
