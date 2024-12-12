import { useState, useContext, useEffect } from "react";
import "../NewsCard/NewsCard.css";
import { useLocation } from "react-router-dom";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import { Link } from "react-router-dom";

function NewsCard({
  article,
  isLoggedIn,
  handleSaveArticle,
  handleDeleteArticle,
  setActiveModal,
}) {
  const location = useLocation();
  const { userArticles } = useContext(UserArticleContext);
  const [isClicked, setIsClicked] = useState(false);

  const source =
    location.pathname === "/"
      ? (typeof article.source?.name === "string"
          ? article.source.name
          : "Unknown Source"
        )
          .toUpperCase()
          .split(".")[0]
      : (typeof article.source === "string" ? article.source : "Unknown Source")
          .toUpperCase()
          .split(".")[0];
  const dateInWords = new Date(
    location.pathname === "/" ? article.publishedAt : article.date
  ).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isSaved = userArticles.some((existingArticle) => {
    return existingArticle.link === article.url;
  });

  const handleSaveClick = () => {
    if (isLoggedIn) {
      isSaved === true ? setIsClicked(false) : setIsClicked(true);
      handleSaveArticle(article);
      return;
    }
    setActiveModal("login");
  };

  const handleDeleteClick = () => {
    handleDeleteArticle(article._id);
  };

  return (
    <div className="news-card__container">
      <div className="news-card__image-container">
        {location.pathname === "/saved-news" && (
          <div className="news-card__keyword-icon">{article.keyword}</div>
        )}
        <div className="news-card__btns">
          {!isLoggedIn && location.pathname === "/" && (
            <div className="news-card__sign-in-icon">
              Sign in to save articles
            </div>
          )}

          {location.pathname === "/" && (
            <button
              className={
                isSaved
                  ? "news-card__save_active news-card__save"
                  : "news-card__save"
              }
              onClick={handleSaveClick}
            ></button>
          )}
          {location.pathname === "/saved-news" && (
            <button
              className="news-card__delete"
              onClick={handleDeleteClick}
            ></button>
          )}
        </div>
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />
      </div>

      <div className="news-card__text">
        <span className="news-card__date">{dateInWords}</span>
        <Link
          to={article.link}
          target="_blank"
          className="news-card__title-link"
        >
          <h2 className="news-card__title">{article.title}</h2>
        </Link>
        <p className="news-card__description">
          {location.pathname === "/" ? article.description : article.text}
        </p>
        <span className="news-card__source">{source}</span>
      </div>
    </div>
  );
}

export default NewsCard;
