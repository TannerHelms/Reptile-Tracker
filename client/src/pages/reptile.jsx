import useAuth from "../hooks/use_auth";

const Reptile = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return <h1>This is the Reptile Page</h1>;
};
export default Reptile;
