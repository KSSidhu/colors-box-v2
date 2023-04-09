import './App.css'
import Palette from './palette/Palette'
import seedColor from './seed/seedColor'

function App() {
    return (
        <div className="App">
            <Palette palette={seedColor[4]} />
        </div>
    )
}

export default App
