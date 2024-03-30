import { Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
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
    </>
  );
};

export default SignUp;
