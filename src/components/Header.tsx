import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Article Storage</h1>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/pedidos">Pedidos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
