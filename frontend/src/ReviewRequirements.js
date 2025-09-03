import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReviewRequirements.css'; // Assuming a CSS file for styling

const ReviewRequirements = () => {
  const location = useLocation();
  const { patient } = location.state || {}; // Get patient data from previous page
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState([
    { id: 1, name: 'Blood transfusion', selected: false },
    { id: 2, name: 'Blood type matching', selected: false },
    { id: 3, name: 'CT scan machine', selected: false },
    { id: 4, name: 'MRI machine', selected: false },
    { id: 5, name: 'ECG machine', selected: false },
    { id: 6, name: 'Cardiac monitoring', selected: false },
  ]);
  const [newRequirementText, setNewRequirementText] = useState('');

  const handleCheckboxChange = (id) => {
    setRequirements(requirements.map(req =>
      req.id === id ? { ...req, selected: !req.selected } : req
    ));
  };

  const handleAddRequirement = () => {
    if (newRequirementText.trim() !== '') {
      const newId = requirements.length > 0 ? Math.max(...requirements.map(req => req.id)) + 1 : 1;
      setRequirements([
        ...requirements,
        { id: newId, name: newRequirementText.trim(), selected: true },
      ]);
      setNewRequirementText('');
    }
  };

  const handleSearchHospitals = () => {
    // Navigate to a page that lists hospitals based on selected requirements
    const selectedRequirements = requirements.filter(req => req.selected).map(req => req.name);
    navigate('/hospitals', { state: { patient, selectedRequirements } });
  };

  return (
    <div className="review-requirements-container">
      <h2>Review Requirements</h2>
      {patient && <p>Patient Name: {patient.name} (ID: {patient.id})</p>}

      <h3>Select Requirements:</h3>
      <div className="requirements-list">
        {requirements.map(req => (
          <div key={req.id} className="requirement-item">
            <input
              type="checkbox"
              id={`req-${req.id}`}
              checked={req.selected}
              onChange={() => handleCheckboxChange(req.id)}
            />
            <label htmlFor={`req-${req.id}`}>{req.name}</label>
          </div>
        ))}
      </div>

      <div className="add-requirement-section">
        <input
          type="text"
          placeholder="Add Additional Requirement"
          value={newRequirementText}
          onChange={(e) => setNewRequirementText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddRequirement();
            }
          }}
        />
        <button onClick={handleAddRequirement}>Add</button>
      </div>

      <button onClick={handleSearchHospitals} className="search-hospital-button">
        Search Nearest Hospital
      </button>
    </div>
  );
};

export default ReviewRequirements;
