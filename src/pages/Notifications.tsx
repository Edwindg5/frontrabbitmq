import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/Notifications.css";
import { useAuth } from "../hooks/useAuth";

interface Notification {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  estado: string;
}

const Notifications = () => {
  const { role } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editedNotifications, setEditedNotifications] = useState<Record<number, Notification>>({});

  // 🟢 Obtener notificaciones
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8081/notificaciones");
      setNotifications(response.data);
    } catch (error) {
      console.error("❌ Error al obtener notificaciones:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🟠 Manejo de cambios en los campos editables
  const handleInputChange = (id: number, field: keyof Notification, value: string | number) => {
    setEditedNotifications((prev) => ({
      ...prev,
      [id]: {
        ...prev[id] ?? notifications.find(n => n.id === id),
        [field]: value,
      },
    }));
  };

  // 🟣 Enviar pedido a la API para que lo mande a RabbitMQ
  const handleSendPedido = async (id: number) => {
    const pedido = editedNotifications[id] ?? notifications.find(n => n.id === id);
    if (!pedido) {
      Swal.fire("❌ Error", "No se encontró el pedido.", "error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/pedidos", pedido);

      if (response.status === 201) {
        Swal.fire("✅ Éxito", "Pedido enviado correctamente", "success");
      } else {
        Swal.fire("❌ Error", "No se pudo enviar el pedido.", "error");
      }
    } catch (error) {
      console.error("❌ Error al enviar pedido:", error);
      Swal.fire("❌ Error", "Hubo un problema al enviar el pedido.", "error");
    }
  };

  if (role !== "admin") return <p>No tienes acceso a esta página.</p>;

  return (
    <div className="notifications-container">
      <h1>Notificaciones</h1>
      <table className="notifications-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.producto}</td>
              <td>
                <input
                  type="text"
                  value={editedNotifications[notification.id]?.cliente ?? notification.cliente}
                  onChange={(e) => handleInputChange(notification.id, "cliente", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={editedNotifications[notification.id]?.cantidad ?? notification.cantidad}
                  onChange={(e) => handleInputChange(notification.id, "cantidad", Number(e.target.value))}
                />
              </td>
              <td>
                <select
                  value={editedNotifications[notification.id]?.estado ?? notification.estado}
                  onChange={(e) => handleInputChange(notification.id, "estado", e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="procesado">Procesado</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleSendPedido(notification.id)}>🚀 Enviar pedido</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
