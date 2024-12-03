import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import {
  getUserByToken,
  signinUser,
  registerUser,
  checkToken,
  authorize,
} from "../../utils/auth";
import { getToken, setToken, removeToken } from "../../utils/token";
import { getNews } from "../../utils/newsapi";
import { APIkey } from "../../utils/constants";
import { getTodaysDate, getLastWeeksDate } from "../../utils/Dates";
import { getUserArticles, saveArticle, deleteArticle } from "../../utils/Api";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [userArticles, setUserArticles] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessNewsData, setIsSuccessNewsData] = useState(false);
  const [isError, setIsError] = useState(false);
  const [protectedDestination, setProtectedDestination] = useState("");
  const [isAuthSettled, setIsAuthSettled] = useState(false);

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const userArticleContext = {
    userArticles,
    setUserArticles,
  };

  const handleSearchSubmit = () => {
    if (currentKeyword === "") {
      setIsSuccessNewsData(true);
      return;
    }

    setIsLoading(true);
    setNewsData([]);
    setIsSuccessNewsData(false);
    setIsError(false);

    getNews(currentKeyword, APIkey, getLastWeeksDate(), getTodaysDate())
      .then((data) => {
        setIsSuccessNewsData(true);
        setNewsData(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      });
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = (values, resetRegistrationForm) => {
    if (!values) return;

    registerUser(values)
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        resetRegistrationForm();
        closeActiveModal();
        setActiveModal("success");
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleSaveArticle = (article) => {
    const token = getToken();
    const keyword = currentKeyword[0].toUpperCase() + currentKeyword.slice(1);
    if (!token) return;

    if (
      userArticles.some((existingArticle) => {
        return existingArticle.link === article.url;
      })
    ) {
      const unSavedArticle = userArticles.find(
        (existingArticle) => existingArticle.link === article.url
      );
      deleteArticle(unSavedArticle._id, token)
        .then((data) => {
          setUserArticles((prevArticles) =>
            prevArticles.filter((article) => article._id !== data.data._id)
          );
        })
        .catch((err) => console.error(err));
      return;
    }

    saveArticle(
      {
        keyword: keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      },
      token
    )
      .then((newArticle) => {
        setUserArticles((prevArticles) => [...prevArticles, newArticle.data]);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteArticle = (id) => {
    const token = getToken();

    if (!token) return;

    deleteArticle(id, token)
      .then((data) => {
        setUserArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== data.data._id)
        );
      })
      .catch((err) => console.error(err));
  };
  // const handleLogin = (values, resetLoginForm) => {
  //   if (!values) {
  //     return;
  //   }
  //   signinUser(values)
  //     .then((res) => {
  //       console.log(res);
  //       setToken(res.token);
  //       if (res.token) {
  //         getUserByToken(res).then((user) => {
  //           setCurrentUser(user);
  //           setIsLoggedIn(true);
  //           closeActiveModal();
  //           resetLoginForm();
  //           navigate("/");
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Login failed", err);
  //     });
  // };

  const handleLogin = (values, resetLoginForm) => {
    if (!values) return;

    signinUser(values)
      .then((res) => {
        setToken(res.token); // Save token in localStorage
        setLoggedIn(true); // Update login state
        closeActiveModal(); // Close the modal
        resetLoginForm(); // Reset form values
      })
      .catch((err) => {
        console.error(`Login failed: ${err}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    removeToken();
  };

  // useEffect(() => {
  //   if (!isLoggedIn) return;

  //   const token = getToken();
  //   getUserArticles(token).then((articles) => {
  //     setUserArticles(articles);
  //   });
  // }, [currentUser, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const token = getToken(); // Get token from localStorage
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res.data); // Set the current user data
        })
        .catch((err) => {
          console.error(`Error checking token: ${err}`);
          setIsLoggedIn(false); // Reset login state on error
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = getToken();
    if (!token || token === "undefined") {
      setIsAuthSettled(true);
      return;
    }

    getUserByToken(token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        setIsAuthSettled(true);
      })
      .catch((err) => {
        console.error(err);
        setIsAuthSettled(true);
      });
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={userContext}>
        <UserArticleContext.Provider value={userArticleContext}>
          <div className="app__content">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleLoginClick={handleLoginClick}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    handleSearchSubmit={handleSearchSubmit}
                    newsData={newsData}
                    isSuccess={isSuccessNewsData}
                    isLoading={isLoading}
                    isError={isError}
                    setCurrentKeyword={setCurrentKeyword}
                    handleSaveArticle={handleSaveArticle}
                    handleDeleteArticle={handleDeleteArticle}
                    setActiveModal={setActiveModal}
                    currentKeyword={currentKeyword}
                  />
                }
              ></Route>
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthSettled={isAuthSettled}
                    setActiveModal={setActiveModal}
                  >
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      handleLogout={handleLogout}
                      handleDeleteArticle={handleDeleteArticle}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
              handleLogin={handleLogin}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
              handleRegistration={handleRegistration}
            />
            <SuccessModal
              isOpen={activeModal === "success"}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
            />
          </div>
        </UserArticleContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
