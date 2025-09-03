import React, { useState, useEffect } from 'react';
import './AmbulanceManagementPage.css'; // Assuming a CSS file for styling

const AmbulanceManagementPage = () => {
  const [ambulanceSupplies, setAmbulanceSupplies] = useState([]);
  const [showEditSupplyModal, setShowEditSupplyModal] = useState(false);
  const [currentSupply, setCurrentSupply] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [editingAmbulanceId, setEditingAmbulanceId] = useState(null);
  const [editingSupplyIndex, setEditingSupplyIndex] = useState(null);

  useEffect(() => {
    const fetchAmbulanceSupplies = async () => {
      try {
        const response = await fetch('http://localhost:5000/ambulanceSupplies');
        const data = await response.json();
        setAmbulanceSupplies(data);
      } catch (error) {
        console.error('Error fetching ambulance supplies:', error);
      }
    };
    fetchAmbulanceSupplies();
  }, []);

  const handleEditClick = (ambulanceId, supply, supplyIndex) => {
    setEditingAmbulanceId(ambulanceId);
    setEditingSupplyIndex(supplyIndex);
    setCurrentSupply(supply);
    setNewQuantity(supply.quantity.toString());
    setShowEditSupplyModal(true);
  };

  const handleSaveSupply = () => {
    if (currentSupply && newQuantity.trim() !== '') {
      const updatedSupplies = ambulanceSupplies.map(ambulance => {
        if (ambulance.ambulanceId === editingAmbulanceId) {
          const updatedAmbulanceSupplies = ambulance.supplies.map((s, index) =>
            index === editingSupplyIndex ? { ...s, quantity: parseInt(newQuantity) } : s
          );
          return { ...ambulance, supplies: updatedAmbulanceSupplies };
        }
        return ambulance;
      });
      setAmbulanceSupplies(updatedSupplies);
      setShowEditSupplyModal(false);
      setCurrentSupply(null);
      setNewQuantity('');
      setEditingAmbulanceId(null);
      setEditingSupplyIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditSupplyModal(false);
    setCurrentSupply(null);
    setNewQuantity('');
    setEditingAmbulanceId(null);
    setEditingSupplyIndex(null);
  };

  return (
    <div className="ambulance-management-container">
      <h2>Ambulance Management</h2>
      {ambulanceSupplies.map(ambulance => (
        <div key={ambulance.ambulanceId} className="ambulance-card">
          <h3>Ambulance ID: {ambulance.ambulanceId}</h3>
          <div className="supplies-list">
            {ambulance.supplies.map((supply, supplyIndex) => (
              <div key={supplyIndex} className="supply-item">
                <span><strong>{supply.name}:</strong> {supply.quantity}</span>
                <span className="edit-icon" onClick={() => handleEditClick(ambulance.ambulanceId, supply, supplyIndex)}>✏️</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showEditSupplyModal && currentSupply && (
        <div className="modal-overlay">
          <div className="edit-supply-modal">
            <h3>Edit Supply Quantity</h3>
            <div className="form-group">
              <label htmlFor="supply-name">Supply Name:</label>
              <input type="text" id="supply-name" value={currentSupply.name} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="supply-quantity">Quantity:</label>
              <input
                type="number"
                id="supply-quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
              <button onClick={handleSaveSupply} className="save-button">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceManagementPage;

