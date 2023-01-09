import React from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function PrivateRoute({ children }) {
  const { user } = useUserContext();

  const navigate = useNavigate();

  return <div>{user ? <div>{children}</div> : <Navigate to="/" />}</div>;
}
export default PrivateRoute;
