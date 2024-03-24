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
import { useEffect, useState } from "react";
import { z } from "zod";
import useAuth from "../hooks/use_auth";
import { login } from "../store/auth_slice";
import useInit from "../hooks/use_init";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { navigate, dispatch, api } = useInit();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function handleLogin({ email, password }) {
    const { user, token } = await api.post("/sessions", {
      email,
      password,
    });
    if (user && token) {
      await dispatch(login({ user, token }));
      queryClient.invalidateQueries("user");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  }

  if (user) {
    return null;
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
