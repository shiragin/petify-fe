import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function PrivateRoute({ children }) {
  const { userId } = useUserContext();

  console.log('ARE YOU HERE?', userId);

  return <div>{userId ? <div>{children}</div> : <Navigate to="/" />}</div>;
}
export default PrivateRoute;
