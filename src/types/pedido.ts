export interface Pedido {
    id: number;
    cliente: string;
    producto: string;
    cantidad: number;
    estado: "PENDIENTE" | "PROCESADO";
  }
  