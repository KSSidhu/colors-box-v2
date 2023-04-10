import './App.css'
import Palette from './palette/Palette'
import seedColor from './seed/seedColor'
import { generatePalette } from './utils/colorHelper'

function App() {
    console.log(generatePalette(seedColor[4]))
    return (
        <div className="App">
            <Palette palette={seedColor[4]} />
        </div>
    )
}

export default App
