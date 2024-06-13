import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link para crear un enlace

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar usuario');
    }
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h2>Registro</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
