import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function PrivateRoute({ children }) {
  const { user } = useUserContext();

  return <div>{user ? <div>{children}</div> : <Navigate to="/" />}</div>;
}
export default PrivateRoute;
