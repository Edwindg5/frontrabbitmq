// src/pages/egisterUser.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData.email, formData.password);
    navigate("/login");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Registro</h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          name="email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="login-button" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
