import React, { useState } from "react";
import "./LoginForm.css"; // Estilos separados

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de correo inválido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Enviando datos:", formData);
    // Aquí puedes hacer la petición a la API para autenticar
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">
        Welcome,<br />
        <span>sign in to continue</span>
      </div>
      
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="input"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <div className="login-with">
        <div className="button-log"></div>
        <div className="button-log">
          <svg className="icon" height="24" width="24" viewBox="0 0 56.6934 56.6934">
            <path d="M51.981,24.4812c-7.7173..." />
          </svg>
        </div>
        <div className="button-log">
          <svg className="icon" height="24" width="24" viewBox="0 0 56.693 56.693">
            <path d="M40.43,21.739h-7.645v-5.014..." />
          </svg>
        </div>
      </div>

      <button className="button-confirm" type="submit">Let's go →</button>
    </form>
  );
};

export default LoginForm;
