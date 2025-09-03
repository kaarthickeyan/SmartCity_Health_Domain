import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ParamedicLogin from './ParamedicLogin';
import HospitalLogin from './HospitalLogin';
import ParamedicHomePage from './ParamedicHomePage'; // Import the new component
import TripsPage from './TripsPage'; // Import TripsPage
import TripDetailsPage from './TripDetailsPage'; // Import TripDetailsPage
import PatientDetailsPage from './PatientDetailsPage'; // Import PatientDetailsPage
import ReviewRequirements from './ReviewRequirements'; // Import ReviewRequirements
import HospitalListPage from './HospitalListPage'; // Import HospitalListPage
import SelectPatientConditions from './SelectPatientConditions'; // Import SelectPatientConditions
import AmbulanceStatusPage from './AmbulanceStatusPage'; // Import AmbulanceStatusPage
import HospitalInformation from './HospitalInformation'; // Import HospitalInformation
import HospitalPoliciesPage from './HospitalPoliciesPage'; // Import HospitalPoliciesPage
import ManageRequirementsPage from './ManageRequirementsPage'; // Import ManageRequirementsPage
import AmbulanceManagementPage from './AmbulanceManagementPage'; // Import AmbulanceManagementPage
import './App.css'; // Keep existing App.css for general styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/paramedic-login" element={<ParamedicLogin />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/paramedic-home" element={<ParamedicHomePage />} />
          <Route path="/paramedic-trips" element={<TripsPage />} />
          <Route path="/trip-details/:id" element={<TripDetailsPage />} /> {/* New route for trip details */}
          <Route path="/patient-details" element={<PatientDetailsPage />} /> {/* New route for patient details */}
          <Route path="/select-conditions" element={<SelectPatientConditions />} />
          <Route path="/review-requirements" element={<ReviewRequirements />} />
          <Route path="/hospitals" element={<HospitalListPage />} />
          <Route path="/ambulance-status" element={<AmbulanceStatusPage />} />
          <Route path="/hospital-info" element={<HospitalInformation />} />
          <Route path="/hospital-policies" element={<HospitalPoliciesPage />} />
          <Route path="/manage-requirements" element={<ManageRequirementsPage />} />
          <Route path="/ambulance-management" element={<AmbulanceManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
