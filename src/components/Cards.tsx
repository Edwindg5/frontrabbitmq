import "../styles/Card.css";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importamos el icono de "X"

interface CardProps {
  title: string;
  description: string;
  cantidad: number;
  onSolicitar: (producto: string) => void;
  onRemove: (producto: string) => void; // ✅ Nueva función para eliminar la tarjeta
}

const Card = ({ title, description, cantidad, onSolicitar, onRemove }: CardProps) => {
  const { isAuthenticated, role, user } = useAuth();
  const [isSolicitado, setIsSolicitado] = useState(false);

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para solicitar un artículo.");
      return;
    }

    const pedido = {
      cliente: user.email,
      producto: title,
      cantidad: cantidad,
      estado: "pendiente",
    };

    try {
      const response = await axios.post("http://localhost:8082/notificaciones", pedido);

      if (response.status === 201) {
        setIsSolicitado(true);
        onSolicitar(title);
        alert(`Artículo solicitado correctamente.`);
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
      {/* Botón de eliminar */}
      <button className="remove-button" onClick={() => onRemove(title)}>
        <FaTimes />
      </button>

      <div className="card-content">
        <h2 className="card-title">
          {title} {isSolicitado && <span className="notification-bubble">🔴</span>}
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
