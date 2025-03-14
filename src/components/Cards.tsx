import "../styles/Card.css";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  const { isAuthenticated, role, user } = useAuth();
  const [isSolicitado, setIsSolicitado] = useState(false);
  useEffect(() => {
    const fetchPedidosPendientes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pedidos/pendientes");
        const pendientes = response.data.some(
          (pedido: any) => pedido.producto.toLowerCase() === title.toLowerCase()
        );
        setIsSolicitado(pendientes);
      } catch (error) {
        console.error("Error al obtener los pedidos pendientes:", error);
      }
    };
  
    fetchPedidosPendientes();
  }, [title]);
  

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para solicitar un artículo.");
      return;
    }

    const pedido = {
      cliente: user.email,
      producto: title,
      cantidad: 1,
      estado: "pendiente"
    };

    try {
      // Solo se envía la solicitud directamente a API2
      const response = await axios.post("http://localhost:8081/notificaciones", pedido);

      if (response.status === 201) {
        setIsSolicitado(true);
        alert(`Artículo solicitado correctamente. Datos enviados:\n${JSON.stringify(pedido, null, 2)}`);
      } else {
        alert("Error al solicitar el artículo.");
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Hubo un problema con la solicitud.");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">
          {title}
          {isSolicitado && <span className="notification-bubble">🔴</span>}
        </h2>
        <p className="card-description">{description}</p>
        {isAuthenticated && role === "user" && (
          <button className="button" onClick={handleClick}>
            Solicitar Artículo
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
