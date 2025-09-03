import React, { useState, useEffect } from 'react';
import './AmbulanceStatusPage.css'; // Assuming a CSS file for styling

const AmbulanceStatusPage = () => {
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch real-time ambulance data from an API
    // For now, let's use some dummy data
    const dummyAmbulances = [
      { id: 1, name: 'AMB101', status: 'Available', location: 'OMR Kelambakkam', driver: 'John Doe' },
      { id: 2, name: 'AMB102', status: 'En Route', location: 'Anna Salai, Chennai', driver: 'Jane Smith' },
      { id: 3, name: 'AMB103', status: 'On Call', location: 'Tambaram, Chennai', driver: 'Peter Jones' },
      { id: 4, name: 'AMB104', status: 'Available', location: 'ECR Road, Chennai', driver: 'Mary Lee' },
    ];
    setAmbulances(dummyAmbulances);
  }, []);

  return (
    <div className="ambulance-status-container">
      <h2>Ambulance Status</h2>
      <div className="ambulance-list">
        {ambulances.map(ambulance => (
          <div key={ambulance.id} className={`ambulance-item ${ambulance.status.toLowerCase().replace(' ', '-')}`}>
            <h3>{ambulance.name}</h3>
            <p><strong>Status:</strong> {ambulance.status}</p>
            <p><strong>Location:</strong> {ambulance.location}</p>
            <p><strong>Driver:</strong> {ambulance.driver}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceStatusPage;

