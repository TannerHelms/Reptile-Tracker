import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import classes from "../css/authentication_tile.module.css";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Form, useForm, zodResolver } from "@mantine/form";
import useApi from "../hooks/use_api";
import useCurrentUser from "../hooks/use_User";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

export function AuthenticationTitle() {
  const navigate = useNavigate();
  const userContext = useCurrentUser();
  const api = useApi();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });
  const [error, setError] = useState(null);

  async function login({ email, password }) {
    const { token } = await api.post("/sessions", {
      email,
      password,
    });
    if (token) {
      userContext.updateUser({ token });
      window.localStorage.setItem("jwt", token);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  }
  return (
    <form onSubmit={form.onSubmit((values) => login(values))} className="w-600">
      <Title ta="center" className={classes.title}>
        Reptile Tracker!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" className="flex">
        <p className="text-center text-red-600">{error && error}</p>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt="lg">
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}

{
  /* <Center className="w-screen h-screen">
        <h2>Login</h2>
        <form className="sign-up-form" onSubmit={login}>
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
        
        <button type="submit">Login</button>
        </form>
      </Center> */
}
