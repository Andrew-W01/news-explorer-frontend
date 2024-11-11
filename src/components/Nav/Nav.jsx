import "../Nav/Nav.css";
import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import MainMenu from "../MainMenu/MainMenu";

function Nav({ isInverse }) {
  return (
    <nav className="nav">
      <p className="nav__logo ">NewsExplorer</p>
      <NavLoggedIn isInverse={isInverse} />
      <NavLoggedOut />
      <MainMenu />
    </nav>
  );
}
export default Nav;
