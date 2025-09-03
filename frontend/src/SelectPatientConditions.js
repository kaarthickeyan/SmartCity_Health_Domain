import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SelectPatientConditions.css'; // Assuming a CSS file for styling

const SelectPatientConditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state || {};

  const [conditions, setConditions] = useState([
    { id: 1, name: 'High Blood loss', selected: false },
    { id: 2, name: 'Heavy injury in brain', selected: false },
    { id: 3, name: 'Severe chest pain', selected: false },
    { id: 4, name: 'Suspected Heart Attack', selected: false },
    { id: 5, name: 'Severe Abdominal Pain', selected: false },
    { id: 6, name: 'Fractured bones', selected: false },
    { id: 7, name: 'Respiratory Diseases', selected: false },
    { id: 8, name: 'Stroke', selected: false },
    { id: 9, name: 'Unconscious patient', selected: false },
    { id: 10, name: 'Severe burnst', selected: false },
    { id: 11, name: 'Allergic reaction', selected: false },
    { id: 12, name: 'Trauma from accident', selected: false },
    { id: 13, name: 'Severe dehydration', selected: false },
  ]);

  useEffect(() => {
    if (patient && patient.conditions) {
      const initialConditions = patient.conditions.split(', ').map(cond => cond.trim());
      setConditions(prevConditions =>
        prevConditions.map(c =>
          initialConditions.includes(c.name) ? { ...c, selected: true } : c
        )
      );
    }
  }, [patient]);

  const handleConditionChange = (id) => {
    setConditions(conditions.map(cond =>
      cond.id === id ? { ...cond, selected: !cond.selected } : cond
    ));
  };

  const handleNext = () => {
    const selectedConditions = conditions.filter(c => c.selected).map(c => c.name).join(', ');
    navigate('/review-requirements', { state: { patient: { ...patient, conditions: selectedConditions } } });
  };

  return (
    <div className="select-patient-conditions-container">
      <h2>Select Patient Conditions</h2>
      {patient && <p>Patient Name: {patient.name || 'N/A'} (ID: {patient.id})</p>}

      <div className="conditions-list">
        {conditions.map(condition => (
          <div key={condition.id} className="condition-item">
            <input
              type="checkbox"
              id={`condition-${condition.id}`}
              checked={condition.selected}
              onChange={() => handleConditionChange(condition.id)}
            />
            <label htmlFor={`condition-${condition.id}`}>{condition.name}</label>
          </div>
        ))}
      </div>

      <button onClick={handleNext} className="next-button">
        Next
      </button>
    </div>
  );
};

export default SelectPatientConditions;

