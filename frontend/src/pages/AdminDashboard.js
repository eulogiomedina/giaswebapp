// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import PolicyCrud from '../components/PolicyCrud';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const AdminDashboard = ({ onLogout, toggleDarkMode, isDarkMode }) => {
  const [showPolicyCrud, setShowPolicyCrud] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleShowPolicyCrud = () => {
    setShowPolicyCrud(true);
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido al panel de administración.</p>

        {/* Tarjeta para Gestión de Políticas */}
        {!showPolicyCrud ? (
          <div className="dashboard-tools-container">
            <div className="dashboard-tool" onClick={handleShowPolicyCrud}>
              <div className="tool-icon policy-icon"></div>
              <h3>Gestión de Políticas</h3>
              <p>Ver y gestionar las políticas del sistema</p>
              <button className="view-button">Ir</button>
            </div>

            {/* Tarjeta para modificar datos de contacto */}
            <div className="dashboard-tool">
              <div className="tool-icon contact-icon"></div>
              <h3>Modificar Datos de Contacto</h3>
              <p>Ver y modificar los datos de contacto del sistema</p>
              <button
                className="view-button"
                onClick={() => navigate('/contact-edit')} // Navegar a la página de edición de contacto
              >
                Ir
              </button>
            </div>

            {/* Botones para acceder a las auditorías */}
            <div className="dashboard-tool">
              <div className="tool-icon log-icon"></div>
              <h3>Registros de Inicios de Sesión</h3>
              <p>Ver los registros de todos los inicios de sesión</p>
              <button
                className="view-button"
                onClick={() => navigate('/audit-logs')} // Navegar a los registros de inicios de sesión
              >
                Ver Registros
              </button>
            </div>

            <div className="dashboard-tool">
              <div className="tool-icon password-change-icon"></div>
              <h3>Registros de Cambios de Contraseña</h3>
              <p>Ver los registros de cambios de contraseña</p>
              <button
                className="view-button"
                onClick={() => navigate('/password-change-logs')} // Navegar a los registros de cambios de contraseña
              >
                Ver Registros
              </button>
            </div>
          </div>
        ) : (
          <div className="policy-management">
            <h2>Gestión de Políticas</h2>
            <PolicyCrud />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
