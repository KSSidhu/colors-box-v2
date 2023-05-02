import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Palette from './palette/Palette'
import PaletteList from './palette/PaletteList'
import seedColor from './seed/seedColor'

const router = createBrowserRouter([
    {
        path: '/',
        element: <PaletteList palettes={seedColor} />,
    },
    {
        path: '/palette/:paletteId',
        element: <Palette />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
