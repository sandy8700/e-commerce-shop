
import React from 'react';
import { firebaseApp } from "../firebase";
import { Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const PrivateRoute = ({ element }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
