import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientDetailsForm.css';

const patientConditions = [
  'High Blood loss',
  'Heavy injury in brain',
  'Severe chest pain',
  'Suspected Heart Attack',
  'Severe Abdominal Pain',
  'Fractured bones',
  'Respiratory Diseases',
  'Stroke',
  'Unconscious patient',
  'Severe burnt',
  'Allergic reaction',
  'Trauma from accident',
  'Severe dehydration',
  'Diabetic emergency',
  'Seizure',
  'Asthma attack',
  'Poisoning',
  'Childbirth emergency',
  'Spinal injury',
  'Heatstroke/Hypothermia',
];

const medicalRequirements = [
  'Blood transfusion',
  'Blood type matching',
  'CT scan machine',
  'MRI machine',
  'ECG machine',
  'Cardiac monitoring',
  'Ventilator',
  'Defibrillator',
  'IV fluids',
  'Pain medication',
  'Antibiotics',
  'Surgical team',
  'Isolation room',
  'Pediatric specialist',
];

const PatientDetailsForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Conditions, 2: Requirements
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  const [patients, setPatients] = useState([
    {
      conditions: [],
      requirements: [],
      additionalRequirement: '',
    },
  ]);

  const handleConditionChange = (condition) => {
    const updatedPatients = [...patients];
    const currentConditions = updatedPatients[currentPatientIndex].conditions;
    if (currentConditions.includes(condition)) {
      updatedPatients[currentPatientIndex].conditions = currentConditions.filter((c) => c !== condition);
    } else {
      updatedPatients[currentPatientIndex].conditions = [...currentConditions, condition];
    }
    setPatients(updatedPatients);
  };

  const handleRequirementChange = (requirement) => {
    const updatedPatients = [...patients];
    const currentRequirements = updatedPatients[currentPatientIndex].requirements;
    if (currentRequirements.includes(requirement)) {
      updatedPatients[currentPatientIndex].requirements = currentRequirements.filter((r) => r !== requirement);
    } else {
      updatedPatients[currentPatientIndex].requirements = [...currentRequirements, requirement];
    }
    setPatients(updatedPatients);
  };

  const handleAdditionalRequirementChange = (e) => {
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].additionalRequirement = e.target.value;
    setPatients(updatedPatients);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleAddAnotherPatient = () => {
    setPatients([
      ...patients,
      {
        conditions: [],
        requirements: [],
        additionalRequirement: '',
      },
    ]);
    setCurrentPatientIndex(currentPatientIndex + 1);
    setStep(1); // Reset to conditions for the new patient
  };

  const handleSearchNearestHospital = () => {
    // In a real application, this would trigger an API call or navigation
    console.log('Searching for nearest hospital with patient data:', patients);
    alert('Searching for nearest hospital! Check console for data.');
    // You might navigate to a results page here
    // navigate('/hospital-results', { state: { patients } });
  };

  return (
    <div className="patient-details-form-container">
      <div className="form-header">
        <button className="back-button" onClick={() => navigate(-1)}>&larr;</button>
        <h2>{step === 1 ? 'Select Patient Conditions' : 'Review Requirements'}</h2>
      </div>

      <div className="patient-counter">Patient {currentPatientIndex + 1} of {patients.length}</div>

      {step === 1 && (
        <div className="form-step">
          <p>Select Patient Conditions:</p>
          <div className="checkbox-group">
            {patientConditions.map((condition) => (
              <label key={condition} className="checkbox-label">
                <input
                  type="checkbox"
                  value={condition}
                  checked={patients[currentPatientIndex].conditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
                {condition}
              </label>
            ))}
          </div>
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <p>Select Requirements:</p>
          <div className="checkbox-group">
            {medicalRequirements.map((requirement) => (
              <label key={requirement} className="checkbox-label">
                <input
                  type="checkbox"
                  value={requirement}
                  checked={patients[currentPatientIndex].requirements.includes(requirement)}
                  onChange={() => handleRequirementChange(requirement)}
                />
                {requirement}
              </label>
            ))}
          </div>
          <div className="additional-requirement">
            <label htmlFor="additional-req">Add Additional Requirement:</label>
            <input
              type="text"
              id="additional-req"
              value={patients[currentPatientIndex].additionalRequirement}
              onChange={handleAdditionalRequirementChange}
              placeholder="e.g., specific medication"
            />
          </div>
          <div className="form-actions">
            <button className="back-button" onClick={handleBack}>Back</button>
            <button className="action-button" onClick={handleAddAnotherPatient}>Add Another Patient</button>
            <button className="action-button primary" onClick={handleSearchNearestHospital}>Search Nearest Hospital</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsForm;


