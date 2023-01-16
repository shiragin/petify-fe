import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function AdminRoute({ children }) {
  const { user } = useUserContext();

  return (
    <div>{user.isAdmin ? <div>{children}</div> : <Navigate to="/" />}</div>
  );
}
export default AdminRoute;
