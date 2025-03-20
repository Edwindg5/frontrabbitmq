import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterArticle from "./pages/RegisterArticle";
import Notifications from "./pages/Notifications"; 
import ArticulosAdminView from "./pages/ArticulosAdminView";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { JSX } from "react";
import MisPedidos from "./pages/MisPedidos";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const ProtectedAdminRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem("role");

  return isAuthenticated && role === "admin" ? element : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/agregar-articulo" element={<ProtectedAdminRoute element={<RegisterArticle />} />} />
          <Route path="/admin/notificaciones" element={<ProtectedAdminRoute element={<Notifications />} />} />
          <Route path="/admin/articulos" element={<ProtectedAdminRoute element={<ArticulosAdminView />} />} /> 
          <Route path="/pedidos" element={<ProtectedRoute element={<MisPedidos />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;