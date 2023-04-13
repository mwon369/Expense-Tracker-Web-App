import React, { FormEvent, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Log in");
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
      <button>Login</button>
      <p>
        Don't have an account? <a href="/signup/">Sign up</a>
      </p>
    </form>
  );
};

export default Login;
