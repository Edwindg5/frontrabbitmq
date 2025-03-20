import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = login(formData.email, formData.password);
    
    if (success) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-subtitle">Inicia sesión para continuar</p>

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
          Ingresar
        </button>
      </form>

      {/* Sección de registro mejorada */}
      <div className="register-container">
        <p>¿No tienes cuenta?</p>
        <button className="register-button" onClick={() => navigate("/register")}>
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
