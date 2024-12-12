import "./SavedCardsList.css";
// import { useContext } from "react";
// import { UserArticleContext } from "../../contexts/UserArticleContext";
import NewsCard from "../NewsCard/NewsCard";
import { savedNewsStub } from "../../utils/savedNewsStub";

function SavedCardsList({ handleDeleteArticle }) {
  // const { userArticles } = useContext(UserArticleContext);

  return (
    <>
      <ul className="saved-cards">
        {savedNewsStub.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article.url}
            />
          );
        })}
      </ul>
    </>
  );
}

export default SavedCardsList;
