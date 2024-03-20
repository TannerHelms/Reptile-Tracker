import { useDisclosure } from "@mantine/hooks";
import useAuth from "../hooks/use_auth";
const Home = () => {
  const user = useAuth();
  const [opened, { toggle }] = useDisclosure();

  const body = <p>This is the dashboard</p>;

  return user ? body : null;
};
export default Home;
