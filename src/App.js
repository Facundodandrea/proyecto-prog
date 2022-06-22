import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home/Home';
import Pacientes from './pages/Pacientes/Pacientes';
import Medicos from './pages/Medicos/Medicos';
import Turnos from './pages/Turnos/Turnos';
import BuscarTurno from './pages/Turnos/BuscarTurno';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pacientes' element={<Pacientes/>}/>
          <Route path='/medicos' element={<Medicos/>}/>
          <Route path='/turnos' element={<Turnos/>}/>
          <Route path='/busquedaturno' element={<BuscarTurno/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
