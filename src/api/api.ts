import axios from "axios";

const API_PEDIDOS = import.meta.env.VITE_API_PEDIDOS;
const API_PROCESAMIENTO = import.meta.env.VITE_API_PROCESAMIENTO;

export const apiPedidos = axios.create({
  baseURL: API_PEDIDOS,
});

export const apiProcesamiento = axios.create({
  baseURL: API_PROCESAMIENTO,
});
