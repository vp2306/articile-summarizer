import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader } from "../assets";
import axios from "axios";
const rapidApiKey = import.meta.env.VITE_SUMMARIZER_API_KEY;

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localStorageArticles = JSON.parse(localStorage.getItem("articles"));
    if (localStorageArticles) {
      setAllArticles(localStorageArticles);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true); // Start fetching, set isFetching to true

    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: {
        url: article.url,
        length: "3",
      },
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      const articleResponse = await axios.request(options);
      const summarizedText = articleResponse.data.summary;
      const updatedAllArticles = [summarizedText, ...allArticles];

      setArticle({
        ...article,
        summary: summarizedText,
      });

      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsFetching(false); // Fetching is complete, set isFetching to false
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
      </div>

      {/* Display loading spinner when isFetching is true */}
      {isFetching && (
        <div className="flex justify-center items-center my-5">
          <img src={loader} alt="loader" className="w-10 h-10 object-contain" />
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <p className="font-inter font-bold text-black text-center my-5">
          Well, that wasn't supposed to happen...
          <br />
          <span className="font-satoshi font-normal text-gray-700">
            {error?.data?.error}
          </span>
        </p>
      )}

      {/* Display the article summary */}
      {!isFetching && article.summary && (
        <div className="my-5">
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Article <span className="blue_gradient">Summary</span>
          </h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">
              {article.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
