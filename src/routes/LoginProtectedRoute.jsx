import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default LoginProtectedRoute;
