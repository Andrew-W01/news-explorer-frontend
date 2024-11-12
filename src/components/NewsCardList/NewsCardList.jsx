import "../NewsCardList/NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useState } from "react";
import notFound from "../../assets/not-found.png";
import Preloader from "../Preloader/Preloader";

function NewsCardList({
  newsData,
  isSuccess,
  isLoading,
  isError,
  isLoggedIn,
  handleSaveArticle,
  handleDeleteArticle,
  setActiveModal,
}) {
  newsData = newsData.filter((article) => article.title !== "[Removed]");
  //filter out articles that say "removed"

  const [activeNewsDataLength, setActiveNewsDataLength] = useState(3);
  const activeNewsDataItems = newsData.slice(0, activeNewsDataLength);

  const handleOnClick = () => {
    setActiveNewsDataLength((prevState) => prevState + 3);
  };

  const isInitialState =
    newsData.length === 0 && !isSuccess && !isError && !isLoading;
  const emptyNewsDataArray = newsData.length === 0 && isSuccess;

  return (
    <section
      className={
        isInitialState
          ? " news-cards-list news-cards-list_hidden"
          : "news-cards-list"
      }
    >
      <div
        className={
          emptyNewsDataArray
            ? "news-cards-list__not-found"
            : "news-cards-list__not-found news-cards-list__not-found_hidden"
        }
      >
        <img
          src={notFound}
          alt="old school microscope with a sad face inside"
          className="news-cards-list__not-found-icon"
        />
        <h3 className="news-cards-list__not-found-title">Nothing found</h3>
        <p className="news-cards-list__not-found-subtitle">
          Sorry, but nothing matched your search terms.
        </p>
      </div>

      <div
        className={
          isLoading
            ? "news-cards-list__preloader"
            : "news-cards-list__preloader news-cards-list__preloader_hidden"
        }
      >
        <Preloader />
        <h3 className="news-cards-list__preloader-text">
          Searching for news...
        </h3>
      </div>

      <h2 className="news-cards-list__title">Search results</h2>
      <div className="news-cards-list__container">
        <ul className="news-cards-list__list">
          {activeNewsDataItems.map((article) => (
            <NewsCard
              isLoggedIn={isLoggedIn}
              key={article.url}
              article={article}
              handleSaveArticle={handleSaveArticle}
              handleDeleteArticle={handleDeleteArticle}
              setActiveModal={setActiveModal}
            />
          ))}
        </ul>
      </div>
      <button onClick={handleOnClick} className="news-cards-list__more-button">
        Show more
      </button>
    </section>
  );
}

export default NewsCardList;
