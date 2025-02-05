import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  // Hacer la solicitud al backend
  useEffect(() => {
    axios.get('https://psychologist-website-1.onrender.com')
      .then(response => {
        setMessage(`La fecha/hora actual es: ${response.data.time}`);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Bienvenido a la página del psicólogo</h1>
      <p>{message || 'Cargando...'}</p>
    </div>
  );
}

export default App;
