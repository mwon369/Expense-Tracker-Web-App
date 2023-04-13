import React, { FormEvent, useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Login</h3>
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
      <button disabled={isLoading}>Log In</button>
      <p>
        Don't have an account? <a href="/signup/">Sign up</a>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
