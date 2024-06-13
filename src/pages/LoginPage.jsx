import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attempts >= 3) {
      setMessage('Has alcanzado el número máximo de intentos. Inténtalo más tarde.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === 'Login exitoso') {
        navigate('/home');
      } else {
        setAttempts(attempts + 1);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al iniciar sesión');
      setAttempts(attempts + 1);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h2>Login</h2>
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
          <button type="submit">Ingresar</button>
        </form>
        <button onClick={handleRegisterRedirect}>Registrarse</button>
      </div>
    </div>
  );
};

export default LoginPage;
