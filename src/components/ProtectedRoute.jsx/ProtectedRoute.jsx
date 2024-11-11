import { Navigate } from "react-router-dom";
import Nav from "../Nav/Nav";
// When i load the app, isLoggedIn will be false, pretty much always

const ProtectedRoute = () => {
  if (!isAuthSettled) {
    return <Nav isInverse={true} />;
  }

  if (!isLoggedIn) {
    setActiveModal("login");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
