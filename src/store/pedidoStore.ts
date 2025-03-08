import { create } from "zustand";
import { Pedido } from "../types/pedido";
import { apiPedidos } from "../api/api";

interface PedidoStore {
  pedidos: Pedido[];
  cargarPedidos: () => Promise<void>;
  crearPedido: (pedido: Omit<Pedido, "id">) => Promise<void>;
}

export const usePedidoStore = create<PedidoStore>((set) => ({
  pedidos: [],
  
  cargarPedidos: async () => {
    const { data } = await apiPedidos.get<Pedido[]>("/pedidos");
    set({ pedidos: data });
  },

  crearPedido: async (pedido) => {
    await apiPedidos.post("/crear-pedido", pedido);
    set((state) => ({ pedidos: [...state.pedidos, { ...pedido, id: Date.now() }] }));
  },
}));
