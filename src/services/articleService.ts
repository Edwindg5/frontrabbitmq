import axios from "axios";

const API_URL = "http://localhost:8080/pedidos"; // Verifica el puerto correcto

export const createArticle = async (article: {
  cliente: string;
  producto: string;
  cantidad: number;
  estado: string;     // ✅ Incluye el estado
}) => {
  try {
    const response = await axios.post(API_URL, article, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar el artículo:", error);
    throw error;
  }
};
