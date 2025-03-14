import { useEffect, useState } from "react";

interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  estado: string;
}

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/stream-pedidos");

    eventSource.onmessage = (event) => {
      try {
        const nuevoPedido: Pedido = JSON.parse(event.data);
        console.log("📩 Pedido recibido:", nuevoPedido);

        // Agregar el nuevo pedido sin restricciones
        setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
      } catch (error) {
        console.error("❌ Error procesando evento SSE:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("❌ Error en SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="notifications-container">
      <h1>Mis Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        <table className="notifications-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cliente</th>
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido, index) => (
              <tr key={index}>
                <td>{pedido.producto}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.cantidad}</td>
                <td>{pedido.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisPedidos;
