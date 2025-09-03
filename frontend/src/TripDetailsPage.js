import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TripDetailsPage.css';

const TripDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip } = location.state || {};

  if (!trip) {
    return (
      <div className="trip-details-container">
        <div className="details-header">
          <h2>Trip Details</h2>
          <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <p className="no-details-message">No trip details available.</p>
      </div>
    );
  }

  return (
    <div className="trip-details-container">
      <div className="details-header">
        <h2>Trip Details</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="details-content">
        <p><strong>Location:</strong> {trip.location}</p>
        <p><strong>Ambulance:</strong> {trip.ambulance}</p>
        <p><strong>Hospital Visited:</strong> {trip.hospitalVisited}</p>
        <p><strong>Patient Diseases/Cause:</strong> {trip.patientDiseasesCause}</p>
        {/* You can add more details here as needed */}
        <p><strong>Date:</strong> {trip.date}</p>
        <p><strong>Time:</strong> {trip.time}</p>
      </div>
    </div>
  );
};

export default TripDetailsPage;


