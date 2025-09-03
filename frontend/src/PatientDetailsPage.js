import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientDetailsForm.css'; // Assuming a CSS file for styling

const PatientDetailsPage = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    conditions: '', // This will be pre-filled later or selected
    id: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you'd fetch previous patient details from an API
    // For now, let's use some dummy data
    setPatients([
      { id: 1, name: 'Patient 1', conditions: 'Fever' },
      { id: 2, name: 'Patient 2', conditions: 'Cold' },
      { id: 3, name: 'Patient 3', conditions: 'Headache' },
    ]);
  }, []);

  const handleAddNewPatient = () => {
    setShowForm(true);
    // Generate a new patient ID
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setNewPatient({ ...newPatient, id: newId });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPatients([...patients, newPatient]);
    setNewPatient({ name: '', conditions: '', id: null });
    setShowForm(false);
    navigate('/select-conditions', { state: { patient: newPatient } });
  };

  const handleEditPatient = (patient) => {
    navigate('/select-conditions', { state: { patient: patient } });
  };

  return (
    <div className="patient-details-container">
      <h2>Patient Details</h2>

      <button onClick={handleAddNewPatient} className="add-new-patient-button">
        Add New Patient
      </button>

      <h3>Previous Patients:</h3>
      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id}>
            Patient {patient.id}: {patient.name || 'N/A'} - {patient.conditions}
            <button onClick={() => handleEditPatient(patient)} className="edit-button">
              Edit Conditions
            </button>
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="new-patient-form-container">
          <h3>Add New Patient</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="patient-id">Patient ID:</label>
              <input
                type="text"
                id="patient-id"
                name="id"
                value={newPatient.id}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="patient-name">Patient Name:</label>
              <input
                type="text"
                id="patient-name"
                name="name"
                value={newPatient.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patient-conditions">Patient Conditions:</label>
              <textarea
                id="patient-conditions"
                name="conditions"
                value={newPatient.conditions}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Save Patient</button>
          </form>
        </div>
      )}

      
    </div>
  );
};

export default PatientDetailsPage;
