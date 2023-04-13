import React, { FormEvent, useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const { signUp, isLoading, error } = useSignUp();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(username, password, confirmedPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign Up</h3>
      <h4>Username</h4>
      <input
        type="text"
        className="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <h4>Password</h4>
      <input
        type="password"
        className="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <h4>Confirm Password</h4>
      <input
        type="password"
        className="confirm-password"
        placeholder="Confirm password"
        onChange={(e) => setConfirmedPassword(e.target.value)}
        value={confirmedPassword}
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
