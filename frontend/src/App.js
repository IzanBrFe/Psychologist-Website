import React, { useState, useEffect } from 'react';

function App() {
  const [appointments, setAppointments] = useState([]); // Estado para almacenar citas
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las citas del backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://psychologist-website-1.onrender.com/citas'); // Cambia esta URL con la de tu backend
      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Llamar a fetchAppointments al cargar el componente
  useEffect(() => {
    fetchAppointments();
  }, []); // El array vacío asegura que la solicitud se haga solo una vez al montar el componente

  return (
    <div className="App">
      <h1>Psicólogo Jorge</h1>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Mostrar mensaje de error */}
      
      <h2>Citas agendas</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index}>
              {appointment.id} - {appointment.name} - {appointment.fecha}
            </li>
          ))
        ) : (
          <p>No hay citas disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default App;

