import React from 'react';
import { Link } from 'react-router-dom';
import '../src/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-content-left">
        <h1>Welcome to SmartCity Health</h1>
        <div className="login-options">
          <Link to="/paramedic-login" className="login-button paramedic">
            Paramedic Login
          </Link>
          <Link to="/hospital-login" className="login-button hospital">
            Hospital Login
          </Link>
        </div>
      </div>
      <div className="image-container-right">
        <img src="/20250902_1706_Cartoon Ambulance Scene_simple_compose_01k453bsv9fdp8v6s7h6h6xgv4.png" alt="Ambulance Scene" className="ambulance-image" />
      </div>
    </div>
  );
};

export default LoginPage;
