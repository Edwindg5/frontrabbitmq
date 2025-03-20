import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt, FaPlus, FaBell } from "react-icons/fa";
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
      <div className="dashboard-header">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido al sistema de gestión</p>
      </div>
      
      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate("/admin/agregar-articulo")}>
          <div className="card-icon">
            <FaPlus />
          </div>
          <div className="card-text">
            <h3>Agregar Artículo</h3>
            <p>Crear nuevos productos en el sistema</p>
          </div>
        </div>
        
        <div className="admin-card" onClick={() => navigate("/admin/notificaciones")}>
          <div className="card-icon">
            <FaBell />
          </div>
          <div className="card-text">
            <h3>Notificaciones</h3>
            <p>Ver alertas y mensajes importantes</p>
          </div>
        </div>
        


      </div> 

      <button className="logout-float-button" onClick={handleLogout} aria-label="Cerrar sesión">
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
};

export default AdminDashboard;