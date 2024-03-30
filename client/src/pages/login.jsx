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
import useLogin from "../hooks/use_login";
import useCheckAuth from "../hooks/use_auth_check";
import { useDispatch } from "react-redux";
import { turnOffNavbar } from "../store/navbar_slice";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useLogin();
  const dispatch = useDispatch();
  dispatch(turnOffNavbar());
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/sign_up");
  };

  const { isLoading } = useCheckAuth();
  if (isLoading) return null;

  return (
    <Center className="w-screen h-screen background-gradient">
      <form onSubmit={form.onSubmit(login)} className="w-600">
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
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
          <Text c="dimmed" size="sm" ta="center" mt="lg">
            Do not have an account yet?{" "}
            <Anchor size="sm" onClick={handleSignUp} component="button">
              Create account
            </Anchor>
          </Text>
        </Paper>
      </form>
    </Center>
  );
};
export default Login;
