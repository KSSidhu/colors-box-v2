import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Palette from './palette/Palette'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>{'Palettes HERE'}</div>,
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
