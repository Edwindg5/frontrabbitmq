import { createContext, useContext, useState, ReactNode } from "react";

// Definir el tipo de usuario
interface User {
  email: string;
}

// Definir el contexto de autenticación con la propiedad `user`
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("auth")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );

  // Registro de usuario
  const register = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.some((u: { email: string }) => u.email === email);
    if (userExists) {
      alert("Este correo ya está registrado.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
  };

  // Inicio de sesión
  const login = (email: string, password: string) => {
    // Admin predeterminado
    if (email === "admin@correo.com" && password === "admin123") {
      setIsAuthenticated(true);
      setRole("admin");
      setUser({ email });
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ email }));
      return true;
    }

    // Usuarios registrados en localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userFound = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (userFound) {
      setIsAuthenticated(true);
      setRole("user");
      setUser({ email });
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem("user", JSON.stringify({ email }));
      return true;
    } else {
      alert("Correo o contraseña incorrectos.");
      return false;
    }
  };

  // Cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar la autenticación en cualquier parte del código
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
