import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const PrivateRoute = ({ userEmail, children }) => {
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute