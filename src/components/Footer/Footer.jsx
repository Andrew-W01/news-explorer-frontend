import "./Footer.css";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin-icon.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__links-container">
        <Link to="/" className="footer__link footer__link__home">
          <p className="footer__home">Home</p>
        </Link>
        <a
          href="https://tripleten.com/"
          target="_blank"
          className="footer__link footer__link-tripleten"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/Andrew-W01"
          target="_blank"
          className="footer__link footer__link-github"
        >
          <img src={github} alt="" className="footer__icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/andrewworleytech/"
          target="_blank"
          className="footer__link footer__link-linkedin"
        >
          <img src={linkedin} alt="" className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
