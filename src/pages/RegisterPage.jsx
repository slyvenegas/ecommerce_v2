import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        username,
        password,
      });
      console.log(response.data);
      setMessage('Registro exitoso');
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar usuario');
    }
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h2>Register</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
