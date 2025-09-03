import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming a shared CSS file for login forms

const HospitalLogin = () => {
  const [hospitalId, setHospitalId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/hospitals'); // Fetch from /hospitals endpoint
      const hospitals = await response.json();

      const foundHospital = hospitals.find(
        (h) => h.username === hospitalId && h.password === password
      );

      if (foundHospital) {
        console.log('Hospital Login successful!', foundHospital);
        navigate('/hospital-info', { state: { hospital: foundHospital } });
      } else {
        alert('Invalid Hospital ID or Password');
      }
    } catch (error) {
      console.error('Hospital Login error:', error);
      alert('An error occurred during hospital login. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hospital-id">Hospital ID:</label>
          <input
            type="text"
            id="hospital-id"
            name="hospital-id"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hospital-password">Password:</label>
          <input
            type="password"
            id="hospital-password"
            name="hospital-password"
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

export default HospitalLogin;
