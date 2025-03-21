import { useEffect, useState } from "react";

interface Notificacion {
  producto: string;
  cantidad: number;
  estado: string;
  fecha: string;
}

const MisPedidos = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://34.199.34.207:8080/notificaciones") // Ajusta la URL si es diferente
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener notificaciones");
        }
        return response.json();
      })
      .then((data) => setNotificaciones(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="notifications-container">
      <h1>Mis Notificaciones</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {notificaciones.length === 0 ? (
        <p>No hay notificaciones disponibles.</p>
      ) : (
        <table className="notifications-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {notificaciones.map((notificacion, index) => (
              <tr key={index}>
                <td>{notificacion.producto}</td>
                <td>{notificacion.cantidad}</td>
                <td>{notificacion.estado}</td>
                <td>{notificacion.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisPedidos;
