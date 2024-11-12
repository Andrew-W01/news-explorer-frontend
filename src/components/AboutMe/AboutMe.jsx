import "../AboutMe/AboutMe.css";
// import image here

function AboutMe() {
  return (
    <section className="about">
      <div className="about__selfie-container">
        <img />
      </div>
      <div className="about__info">
        <h3 className="about__title">About the author</h3>
        <p className="about__text"> i am a software engineer </p>
        <p className="about__text"> add more about you here</p>
      </div>
    </section>
  );
}

export default AboutMe;
