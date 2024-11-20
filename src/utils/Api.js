import { processServerResponse } from "./utils";

const baseUrl = "http://localhost:3002";

function getUserArticles(token) {
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function deleteArticle(id, token) {
  return fetch(`${baseUrl}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function saveArticle(
  { keyword, title, text, date, source, link, image },
  token
) {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ keyword, title, text, date, source, link, image }),
  }).then(processServerResponse);
}

function getUser(token) {
  return fetch(`${baseUrl}/users/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { getUserArticles, deleteArticle, saveArticle, getUser };
