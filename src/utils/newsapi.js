import { processServerResponse } from "../utils/utils";
export const baseUrl = import.meta.env.VITE_NEWS_API_BASE_URL;

export const getNews = (q, apiKey, from, to) => {
  console.log("is this running");
  return fetch(
    `${baseUrl}?q=${q}&from=${from}&to=${to}&pageSize=100&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  ).then(processServerResponse);
};
