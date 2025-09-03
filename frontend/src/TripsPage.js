import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TripsPage.css';

const TripsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trips } = location.state || {};

  if (!trips) {
    return (
      <div className="trips-page-container">
        <div className="trips-header">
          <h2>Trips Made</h2>
        </div>
        <p className="no-trips-message">No trip data available.</p>
        <button className="back-button" onClick={() => navigate(-1)}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="trips-page-container">
      <div className="trips-header">
        <h2>Trips Made</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="trips-list">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip.id} className="trip-item" onClick={() => navigate(`/trip-details/${trip.id}`, { state: { trip } })}>
              <p className="trip-id">Trip {trip.id}</p>
              <p>Date: {trip.date}</p>
              <p>Time: {trip.time}</p>
            </div>
          ))
        ) : (
          <p className="no-trips-message">No trips recorded.</p>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
