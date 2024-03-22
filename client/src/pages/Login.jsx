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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useApi from "../hooks/use_api";
import { login } from "../store/auth_slice";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });
  const [error, setError] = useState(null);

  async function handleLogin({ email, password }) {
    const { user, token } = await api.post("/sessions", {
      email,
      password,
    });
    if (user && token) {
      dispatch(login({ user, token }));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <Center className="w-screen h-screen background-gradient">
      <form
        onSubmit={form.onSubmit((values) => handleLogin(values))}
        className="w-600"
      >
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
    </Center>
  );
};
export default Login;
