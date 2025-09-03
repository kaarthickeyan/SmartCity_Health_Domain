import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HospitalInformation.css'; // Assuming a CSS file for styling

const HospitalInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hospital } = location.state || {};

  if (!hospital) {
    return <div className="hospital-info-container">Loading hospital data...</div>;
  }

  const handleManageRequirementsClick = () => {
    navigate('/manage-requirements', { state: { hospitalId: hospital.id } });
  };

  const handleAmbulanceStatusClick = () => {
    navigate('/ambulance-status');
  };

  const handleHospitalPoliciesClick = () => {
    navigate('/hospital-policies');
  };

  return (
    <div className="hospital-info-container">
      <div className="header">
        <h2>Hospital Information</h2>
      </div>
      <div className="hospital-details">
        <div className="hospital-icon">➕</div>
        <p><strong>Name:</strong> {hospital.name}</p>
        <p><strong>Location:</strong> {hospital.location}</p>
        <p><strong>Oxygen Cylinders:</strong> {hospital.oxygenCylinders}</p>
        <p><strong>Beds Available:</strong> {hospital.bedsAvailable}</p>
        <p><strong>Medical Equipment:</strong> {hospital.medicalEquipment}</p>
        <p><strong>Specialties:</strong> {hospital.specialties}</p>
        <p><strong>Contact Number:</strong> {hospital.contactNumber}</p>
      </div>
      <div className="hospital-actions">
        <button className="action-button" onClick={handleManageRequirementsClick}>
          Manage Requirements
        </button>
        <button className="action-button" onClick={handleAmbulanceStatusClick}>
          Ambulance Status
        </button>
        <button className="action-button" onClick={handleHospitalPoliciesClick}>
          Hospital Policies
        </button>
      </div>
    </div>
  );
};

export default HospitalInformation;
