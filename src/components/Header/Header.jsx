import "../Header/Header.css";
import Nav from "../Nav/Nav";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  handleSearchSubmit,
  handleLoginClick,
  isLoggedIn,
  handleLogout,
  setCurrentKeyword,
  currentKeyword,
}) {
  const isInverse = false;
  return (
    <header className="header" data-theme={isInverse ? "light" : "dark"}>
      <div className="header__nav-container">
        <Nav
          handleLoginClick={handleLoginClick}
          isInverse={false}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      </div>
      <div className="header__text-container">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account
        </h2>
      </div>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        setCurrentKeyword={setCurrentKeyword}
        currentKeyword={currentKeyword}
      />
    </header>
  );
}

export default Header;
