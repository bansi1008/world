import { useAuth } from "../contexts/Fakecontext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
export default Protected;
