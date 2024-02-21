import { Navigate } from "react-router-dom";

const PanelProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PanelProtectedRoute;
