import useAuth from "../hooks/use_auth";

const Reptile = () => {
  const { user } = useAuth();
  return <h1>This is the Reptile Page</h1>;
};
export default Reptile;
