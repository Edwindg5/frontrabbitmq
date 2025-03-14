import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/Header.css";

const Header = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <header className="header">
      <h1>Articles</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          {isAuthenticated && role === "user" && <li><Link to="/pedidos">Mis Pedidos</Link></li>}
          {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
