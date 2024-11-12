import { Link, useLocation } from "react-router-dom";

function NavLoggedOut({ handleLoginClick }) {
  const location = useLocation();

  return (
    <ul className="nav__list">
      <li className="nav__list-item">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "nav__link nav__link_focused"
              : "nav__link"
          }
        >
          Home
        </Link>
      </li>
      <li>
        <button onClick={handleLoginClick} className="nav__signin-btn">
          Sign in
        </button>
      </li>
    </ul>
  );
}

export default NavLoggedOut;
