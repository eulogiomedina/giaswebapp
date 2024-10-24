import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importar solo íconos de marcas
import { faMapMarkedAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Importar íconos sólidos
import '../styles/Footer.css'; // Asegúrate de ajustar el CSS según el diseño

const Footer = () => {
  const [contactData, setContactData] = useState({
    direccion: '',
    correo: '',
    telefono: '',
  });

  // Efecto para cargar los datos de contacto al montar el componente
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact/contact-info'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setContactData(data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error al cargar los datos de contacto:', error);
      }
    };

    fetchContactData(); // Llama a la función para obtener los datos
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Contenedor para la sección de redes sociales */}
          <div className="social-container">
            <h3>Nuestras Redes:</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} /> Facebook
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Contenedor para la sección de enlaces legales */}
          <div className="legal-container">
            <ul>
              <li><Link to="/politicas/67112fc7a383295d83c2229f">Política de Privacidad</Link></li>
              <li><Link to="/politicas/67113093a383295d83c222a9">Política de Seguridad de la Información</Link></li>
              <li><Link to="/politicas/671130b6a383295d83c222ac">Términos y Condiciones de Uso</Link></li>
              <li><Link to="/politicas/671130eaa383295d83c222af">Política de Retención de Datos</Link></li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="footer-divider" />

        {/* Datos de contacto */}
        <div className="contact-info">
          <h3>Datos de Contacto:</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Dirección: {contactData.direccion || 'Cargando...'}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico: {contactData.correo || 'Cargando...'}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> Número de Teléfono: {contactData.telefono || 'Cargando...'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
