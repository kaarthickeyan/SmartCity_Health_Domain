import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ManageRequirementsPage.css'; // Assuming a CSS file for styling

const ManageRequirementsPage = () => {
  const location = useLocation();
  const { hospitalId } = location.state || {};

  const [requirements, setRequirements] = useState([]);
  const [showAddRequirementModal, setShowAddRequirementModal] = useState(false);
  const [newRequirementName, setNewRequirementName] = useState('');
  const [newRequirementValue, setNewRequirementValue] = useState('');
  const [editingRequirementIndex, setEditingRequirementIndex] = useState(null); // New state for editing

  useEffect(() => {
    // In a real application, you'd fetch hospital-specific requirements using hospitalId
    // For now, let's use dummy data that reflects the image's content
    setRequirements([
      { name: 'Oxygen Cylinders', value: '20' },
      { name: 'Beds Available', value: '50' },
      { name: 'Medical Equipment', value: 'X-ray, MRI, Ultrasound' },
      { name: 'Specialties', value: 'Cardiology, Neurology, Orthopedics' },
      { name: 'Contact Number', value: '(123) 456-7890' },
    ]);
  }, [hospitalId]);

  const handleAddRequirement = () => {
    if (newRequirementName.trim() !== '' && newRequirementValue.trim() !== '') {
      if (editingRequirementIndex !== null) {
        // Edit existing requirement
        const updatedRequirements = requirements.map((req, index) =>
          index === editingRequirementIndex
            ? { name: newRequirementName.trim(), value: newRequirementValue.trim() }
            : req
        );
        setRequirements(updatedRequirements);
      } else {
        // Add new requirement
        setRequirements([
          ...requirements,
          { name: newRequirementName.trim(), value: newRequirementValue.trim() },
        ]);
      }
      setNewRequirementName('');
      setNewRequirementValue('');
      setShowAddRequirementModal(false);
      setEditingRequirementIndex(null); // Reset editing state
    }
  };

  const handleEditClick = (req, index) => {
    setEditingRequirementIndex(index);
    setNewRequirementName(req.name);
    setNewRequirementValue(req.value);
    setShowAddRequirementModal(true);
  };

  const handleCancelModal = () => {
    setShowAddRequirementModal(false);
    setEditingRequirementIndex(null);
    setNewRequirementName('');
    setNewRequirementValue('');
  };

  const handleOpenAddModal = () => {
    setEditingRequirementIndex(null); // Ensure it's for adding new
    setNewRequirementName('');
    setNewRequirementValue('');
    setShowAddRequirementModal(true);
  };

  return (
    <div className="manage-requirements-container">
      <h2>Manage Requirements</h2>
      <div className="requirements-list">
        {requirements.map((req, index) => (
          <div key={index} className="requirement-item">
            <span><strong>{req.name}:</strong> {req.value}</span>
            <span className="edit-icon" onClick={() => handleEditClick(req, index)}>✏️</span>
          </div>
        ))}
      </div>

      <button onClick={handleOpenAddModal} className="add-new-requirement-button">
        Add New Requirement
      </button>

      {showAddRequirementModal && (
        <div className="modal-overlay">
          <div className="add-requirement-modal">
            <h3>{editingRequirementIndex !== null ? 'Edit Requirement' : 'Add New Requirement'}</h3>
            <div className="form-group">
              <label htmlFor="requirement-name">Requirement Name</label>
              <input
                type="text"
                id="requirement-name"
                value={newRequirementName}
                onChange={(e) => setNewRequirementName(e.target.value)}
                placeholder="e.g., Blood Bank" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="requirement-value">Requirement Value</label>
              <input
                type="text"
                id="requirement-value"
                value={newRequirementValue}
                onChange={(e) => setNewRequirementValue(e.target.value)}
                placeholder="e.g., Yes/No, Capacity, etc."
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelModal} className="cancel-button">Cancel</button>
              <button onClick={handleAddRequirement} className="add-button">
                {editingRequirementIndex !== null ? 'Save Changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequirementsPage;
