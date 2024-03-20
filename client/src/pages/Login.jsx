import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/use_api";
import { Button, Center } from "@mantine/core";
import { AuthenticationTitle } from "../componets/authentication_tile";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const api = useApi();

  return (
    <Center className="w-screen h-screen">
      <AuthenticationTitle />
    </Center>
  );
};
export default Login;
