// src/Appointments.js
import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener las citas del backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://psychologist-website.onrender.com/api/citasBackend');
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
  }, []);

  return (
    <div>
      <h2>Citas Agendadas</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
};

export default Appointments;
