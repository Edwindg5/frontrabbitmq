import "../styles/Card.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card = ({ title, description, imageUrl }: CardProps) => {
  const handleClick = async () => {
    try {
      const response = await fetch("https://tu-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: `${title} seleccionado` }),
      });

      if (response.ok) {
        alert("Mensaje enviado correctamente");
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud");
    }
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className="button" onClick={handleClick}>
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
};

export default Card;
