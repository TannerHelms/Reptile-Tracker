import useAuth from "../hooks/use_auth";

const Reptile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return <h1>This is the Reptile Page</h1>;
};
export default Reptile;
