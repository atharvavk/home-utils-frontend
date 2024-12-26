import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const key = localStorage.getItem('key');
  return key ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute

