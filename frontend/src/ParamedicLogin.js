import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming a shared CSS file for login forms

const ParamedicLogin = () => {
  const [paramedicId, setParamedicId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/paramedics');
      const paramedics = await response.json();

      const foundParamedic = paramedics.find(
        (p) => p.username === paramedicId && p.password === password
      );

      if (foundParamedic) {
        console.log('Login successful!', foundParamedic);
        // In a real app, you'd store user info in context/state
        navigate('/paramedic-home', { state: { paramedic: foundParamedic } });
      } else {
        alert('Invalid Paramedic ID or Password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Paramedic Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="paramedic-id">Paramedic ID:</label>
          <input
            type="text"
            id="paramedic-id"
            name="paramedic-id"
            value={paramedicId}
            onChange={(e) => setParamedicId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paramedic-password">Password:</label>
          <input
            type="password"
            id="paramedic-password"
            name="paramedic-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default ParamedicLogin;
