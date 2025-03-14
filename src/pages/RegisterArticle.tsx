import { useState } from "react";
import { createArticle } from "../services/articleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/RegisterArticle.css";

const RegisterArticle = () => {
  const [article, setArticle] = useState({
    cliente: "",
    producto: "",
    cantidad: 0,
    estado: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setArticle((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle(article);

      // Mostrar alerta de éxito
      toast.success("✅ Artículo registrado con éxito", {
        position: "top-right",
        autoClose: 3000,
      });

      // Limpiar el formulario
      setArticle({
        cliente: "",
        producto: "",
        cantidad: 0,
        estado: ""
      });
    } catch (error) {
      toast.error("❌ Error al registrar el artículo");
      console.error(error);
    }
  };

  return (
    <div className="register-article-container">
      <h2>Registrar Artículo</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="cliente" 
          placeholder="Cliente" 
          value={article.cliente}
          onChange={handleChange} 
          required 
        />

        <input 
          type="text" 
          name="producto" 
          placeholder="Producto" 
          value={article.producto}
          onChange={handleChange} 
          required 
        />

        <input 
          type="number" 
          name="cantidad" 
          placeholder="Cantidad" 
          value={article.cantidad}
          onChange={handleChange} 
          required 
        />

        <input 
          type="text" 
          name="estado" 
          placeholder="Estado" 
          value={article.estado}
          onChange={handleChange} 
          required 
        />

        <button type="submit">Registrar</button>
      </form>

      {/* Componente para mostrar las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default RegisterArticle;
