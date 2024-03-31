import {
  Button,
  Center,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import useLogin from "../hooks/use_login";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { login } = useLogin();

  async function createUser(e) {
    e.preventDefault();
    const res = await fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    if (res.ok) {
      login({email, password});
    }
  }

  return (
    <>
      <Center className="w-screen h-screen background-gradient">
        <form onSubmit={createUser} className="w-600">
          <Title ta="center" className="font-black">
            Reptile Tracker!
          </Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            className="flex"
          >
            <Title size="h2" ta="center" className="font-black">
              Sign Up
            </Title>
            <p className="text-center text-red-600"></p>
            <TextInput
              label="First Name"
              placeholder="First name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              label="Last Name"
              placeholder="Last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth mt="xl" type="submit">
              Create Account
            </Button>
          </Paper>
        </form>
      </Center>
    </>
  );
};

export default SignUp;
