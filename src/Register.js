import React, { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: ""
};

export default function Register() {
  // const [form, setForm] = useState({
  //   username: "",
  //   password: ""
  // });
  /* Put username and password in initialState in order to easily clear out form */
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initialState);
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
