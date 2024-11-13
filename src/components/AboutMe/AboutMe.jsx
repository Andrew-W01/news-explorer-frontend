import "../AboutMe/AboutMe.css";
import selfie from "../../assets/profile-image.jpg";

function AboutMe() {
  return (
    <section className="about">
      <div className="about__selfie-container">
        <img src={selfie} alt="close up image" className="about__selfie" />
      </div>
      <div className="about__info">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">
          I’m Andrew. A full-stack software engineer.
        </p>
        <p className="about__text"></p>
      </div>
    </section>
  );
}

export default AboutMe;
