import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context";

const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Loading...</div>;

  return state.data ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
