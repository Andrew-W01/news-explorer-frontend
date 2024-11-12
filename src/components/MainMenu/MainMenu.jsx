import "../MainMenu/MainMenu.css";

function MainMenu() {
  return (
    <div className="main-menu">
      <div className="menu__top">
        <p className="menu__logo">NewsExplorer</p>
        <button className="menu__close-btn" type="button"></button>
      </div>

      <div className="menu__links">
        {isLoggedIn ? (
          <>
            <ul className="menu__list">
              <li className="menu-item">
                <Link to="/" className="menu__link -menu__link_loggedin">
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  to="/saved-news"
                  className="menu__link menu__link_loggedin"
                >
                  Saved Articles
                </Link>
              </li>
            </ul>
            <div className="menu__signout-div">
              <p className="menu-signout-name">Elise{currentUser?.name}</p>
              <button
                onClick={handleLogout}
                className={signoutBtnClass}
              ></button>
            </div>
          </>
        ) : (
          <>
            <ul className="menu__list">
              <li className="menu-item">
                <Link to="/" className="menu__link">
                  Home
                </Link>
              </li>
            </ul>
            <button onClick={handleLoginClick} className="menu__signin-btn">
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default MainMenu;
