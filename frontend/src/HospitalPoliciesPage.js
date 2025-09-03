import React from 'react';
import './HospitalPoliciesPage.css'; // Assuming a CSS file for styling

const HospitalPoliciesPage = () => {
  const policies = [
    {
      title: 'Visitor Policy',
      content: 'Visitors must adhere to hospital visiting hours. All visitors should check in at the front desk and follow health and safety guidelines',
    },
    {
      title: 'Patient Privacy',
      content: 'Patient information is confidential and will only shared with authorized personnel. Please contact the administration for further details',
    },
    {
      title: 'Emergency Procedures',
      content: 'In case of emergency, please follow the instructions of hospital staff. Emergency exits are clearly marked throughout the facility.',
    },
    {
      title: 'Insurance and Billing',
      content: 'Patients are required to provide insurance details upon admission. Billing procedures will be explained by our finance department.',
    },
  ];

  return (
    <div className="hospital-policies-container">
      <h2>Hospital Policies</h2>
      <div className="policies-list">
        {policies.map((policy, index) => (
          <div key={index} className="policy-item">
            <h3>{policy.title}</h3>
            <p>{policy.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalPoliciesPage;

