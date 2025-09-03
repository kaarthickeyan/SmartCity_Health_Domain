import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ParamedicHomePage.css';

const ParamedicHomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paramedic } = location.state || {};

  if (!paramedic) {
    return <div className="paramedic-home-container">Loading paramedic data...</div>;
  }

  const handleTripMadeClick = () => {
    navigate('/paramedic-trips', { state: { trips: paramedic.trips } });
  };

  const handleEnterPatientDetailsClick = () => {
    navigate('/patient-details');
  };

  const handleAmbulanceManagementClick = () => {
    navigate('/ambulance-management');
  };

  return (
    <div className="paramedic-home-container">
      <div className="header">
        <h2>Home Page</h2>
      </div>
      <div className="paramedic-details">
        <div className="icon-placeholder">👤</div>
        <p><strong>Name:</strong> {paramedic.name}</p>
        <p><strong>Position:</strong> {paramedic.position}</p>
        <p><strong>Experience:</strong> {paramedic.experience}</p>
        <p><strong>Email:</strong> {paramedic.email}</p>
      </div>

      <div className="paramedic-actions">
        <button className="action-button" onClick={handleTripMadeClick}>
          <span className="button-icon">🚌</span> Trip Made
        </button>
        <button className="action-button" onClick={handleEnterPatientDetailsClick}>
          <span className="button-icon">➕</span> Enter Patient Details
        </button>
        <button className="action-button" onClick={handleAmbulanceManagementClick}>
          <span className="button-icon">🛠️</span> Ambulance Management
        </button>
      </div>
    </div>
  );
};

export default ParamedicHomePage;
