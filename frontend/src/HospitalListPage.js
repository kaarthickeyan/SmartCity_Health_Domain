import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './HospitalListPage.css'; // Assuming a CSS file for styling

const HospitalListPage = () => {
  const location = useLocation();
  const { patient, selectedRequirements } = location.state || {};
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch hospitals based on selectedRequirements
    // For now, let's use dummy data
    const dummyHospitals = [
      { id: 1, name: 'Apollo Hospital', location: 'OMR Thoraipakkam', contact: ' (044) 567-890', services: ['Blood transfusion', 'CT scan machine'] },
      { id: 2, name: 'Rajaji Govt Hospital', location: 'Egmore', contact: '785476752', services: ['Blood type matching', 'Cardiac monitoring'] },
      { id: 3, name: 'Fortis Malar Hospital', location: 'OMR Kelambakkam', contact: '(044) 2235 678', services: ['MRI machine'] },
      { id: 4, name: 'Diana Hospital', location: 'Vandalur-Kelambakkam', contact: '(022) 2661 60', services: ['ECG machine'] },
    ];

    let hospitalsToDisplay = [];

    if (selectedRequirements && selectedRequirements.length > 0) {
      hospitalsToDisplay = dummyHospitals.filter(hospital =>
        selectedRequirements.every(req => hospital.services.includes(req))
      );
    }

    if (hospitalsToDisplay.length === 0) {
      // If no hospitals match or no requirements selected, pick 2 random hospitals
      const shuffled = [...dummyHospitals].sort(() => 0.5 - Math.random());
      hospitalsToDisplay = shuffled.slice(0, 2);
    }

    setHospitals(hospitalsToDisplay);
  }, [selectedRequirements]);

  return (
    <div className="hospital-list-container">
      <h2>Nearest Hospitals</h2>
      {patient && <p>Patient Name: {patient.name} (ID: {patient.id})</p>}
      {selectedRequirements && selectedRequirements.length > 0 && (
        <p>Required Services: {selectedRequirements.join(', ')}</p>
      )}

      {
        <ul className="hospital-list">
          {hospitals.map(hospital => (
            <li key={hospital.id} className="hospital-item">
              <h3>{hospital.name}</h3>
              <p>Location: {hospital.location}</p>
              <p>Contact: {hospital.contact}</p>
              <p>Services: {hospital.services.join(', ')}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default HospitalListPage;
