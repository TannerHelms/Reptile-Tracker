import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Must be at least 6 characters"),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

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
      navigate("/dashboard");
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form className="sign-up-form" onSubmit={createUser}>
        <input
          placeholder="First name"
          type="text"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last name"
          type="text"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>hi there</Button>

        <button>Create Account</button>
      </form>

        <Center className="w-screen h-screen background-gradient">
          <form onSubmit={form.onSubmit(createUser)} className="w-600">
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
              <p className="text-center text-red-600">{error && error.message}</p>
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
              <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
              </Group>
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
