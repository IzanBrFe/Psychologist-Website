import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Importa el componente Home
import Appointments from './Citas'; // Importa el componente Appointments

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/citas">Citas</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Página Home */}
          <Route path="/" element={<Home />} />

          {/* Página de Citas */}
          <Route path="/citas" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


