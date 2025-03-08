import Header from "../components/Header";
import Card from "../components/Cards";
import "../styles/Home.css"; // Creamos un CSS para Home

const Home = () => {
  return (
    <div>
      <Header />
      <main className="home-container">
        <h1>Almacenamiento de Articulos</h1>
        <div className="cards-container">
          <Card
            title="Pedidos"
            description="Revisa y gestiona tus pedidos fácilmente."
            imageUrl="https://source.unsplash.com/300x180/?delivery"
          />
          <Card
            title="Productos"
            description="Explora nuestra selección de productos exclusivos."
            imageUrl="https://source.unsplash.com/300x180/?products"
          />
          <Card
            title="Soporte"
            description="¿Necesitas ayuda? Contáctanos en cualquier momento."
            imageUrl="https://source.unsplash.com/300x180/?support"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
