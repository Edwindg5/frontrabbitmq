import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa"; // Importamos el icono de cierre de sesión
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administrador</h1>
      <p>Seleccione una opción:</p>
      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/agregar-articulo")}>Agregar Artículo</button>
        <button onClick={() => navigate("/admin/notificaciones")}>Ver Notificaciones</button>
        <button onClick={() => navigate("/admin/articulos")}>Ver Todos los Artículos</button>
        <button onClick={() => navigate("/admin/historial-pedidos")}>Historial de Pedidos</button>
      </div>

      {/* Botón flotante de cerrar sesión */}
      <button className="logout-float-button" onClick={handleLogout}>
        <FaSignOutAlt size={24} />
      </button>
    </div>
  );
};

export default AdminDashboard;
