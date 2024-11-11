import "../Header/Header.css";
import Nav from "../Nav/Nav";

function Header() {
  return (
    <header className="header">
      <div className="header__nav-container">
        <Nav />
      </div>
      <div className="header__text-container">
        <h1 className="header__title">Whats going on in the world</h1>
        <h2 className="header__subtitle">
          Find the latest news on any topic ans save them in your personal
          account
        </h2>
      </div>
    </header>
  );
}

export default Header;
