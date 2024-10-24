import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import UserHeader from './components/UserHeader';
import AdminHeader from './components/AdminHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PolicyViewer from './components/PolicyViewer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Profile from './pages/Profile';
import Savings from './pages/Savings'; 
import AuditLogs from './components/AuditLogs';
import PasswordChangeLogs from './components/PasswordChangeLogs';
import ContactEdit from './components/ContactEdit';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verifica el estado de autenticación y el rol cada vez que el componente se renderiza
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(!!user);
    setIsAdmin(user?.role === 'admin'); // Comprueba si el usuario es administrador
  }, []); // Solo se ejecuta una vez al cargar

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        {isAdmin ? (
          <AdminHeader onLogout={handleLogout} />
        ) : isAuthenticated ? (
          <UserHeader onLogout={handleLogout} />
        ) : (
          <Header />
        )}

        <ToastContainer position="top-right" autoClose={5000} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
              } 
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/politicas/:id" element={<PolicyViewer />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/password-change-logs" element={<PasswordChangeLogs />} />
            <Route path="/contact-edit" element={<ContactEdit />} />


            <Route 
              path="/profile" 
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/savings" 
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <Savings />
                </PrivateRoute>
              } 
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
