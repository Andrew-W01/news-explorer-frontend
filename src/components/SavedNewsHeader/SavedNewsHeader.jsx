import "../SavedNewsHeader/SavedNewsHeader.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function SavedNewsHeader() {
  const { currentUser } = useContext(CurrentUserContext);
  const { userArticles } = useContext(UserArticleContext);

  const keywords = userArticles
    .map((article) => article.keyword)
    .reduce((accumulator, item) => {
      if (!accumulator.includes(item)) {
        accumulator.push(item);
      }
      return accumulator;
    }, []);

  return (
    <section className="saved-news-header">
      <h3 className="saved-news-header__title">Saved articles</h3>
      <p className="saved-news-header__subtitle">
        {currentUser?.name}, you have {userArticles?.length} saved article
        <span>{userArticles.length === 1 ? "" : "s"}</span>
      </p>

      <p className="saved-news-header__keywords">
        By keywords:{" "}
        <span className="saved-news-header__keywords_bold">
          {keywords.length > 2
            ? `${keywords[0]}, ${keywords[1]}, and ${
                keywords.length - 2
              } other${keywords.length > 3 ? "s" : ""}`
            : keywords.length === 2
            ? `${keywords[0]} and ${keywords[1]}`
            : keywords.length === 1
            ? keywords[0]
            : "no keywords yet"}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
