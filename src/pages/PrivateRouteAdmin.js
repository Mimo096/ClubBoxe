import { Navigate } from 'react-router-dom';

function PrivateRouteAdmin({ children }) {
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    return <Navigate to="/admin/connexion-ultra-secrete-2025" replace />;
  }

  return children;
}

export default PrivateRouteAdmin;
