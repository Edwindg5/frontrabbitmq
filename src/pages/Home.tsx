// src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Cards";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const [pedidos, setPedidos] = useState<{ producto: string; cantidad: number }[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pedidos/pendientes");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos pendientes:", error);
      }
    };
  
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 5000);
    return () => clearInterval(interval);
  }, []);
  
  

  return (
    <div>
      <main className="home-container">
        <h1>Artículos</h1>
        <div className="cards-container">
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <Card key={index} title={pedido.producto} description={`Cantidad: ${pedido.cantidad}`} />
            ))
          ) : (
            <p>No hay pedidos registrados.</p>
          )}
        </div>
      </main>

      {isAuthenticated && (
        <button className="logout-float-button" onClick={logout}>
          <FaSignOutAlt size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
