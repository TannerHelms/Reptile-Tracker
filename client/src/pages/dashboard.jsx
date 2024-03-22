import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use_auth";
const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const body = <p>This is the dashboard</p>;

  return user ? body : null;
};

export default Home;
