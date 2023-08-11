import { getTrendingNewsBySource, getTrendingNewsByTopic, searchNews } from "../Utils/fetch-news";
import {formatDate} from '../Utils/format-data';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PREVIEW_IMG = "/assets/default-preview-image.svg";

export default function ArticleView() {
  const [articles, setArticles] = useState([]);
  const [articleCount, setArticleCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get(`topic`);
  const query = searchParams.get('q');
  const sources = searchParams.get('sources');

  useEffect(
    () => async () => {
      if (query) {
          const { resultCount, articles: data } = await searchNews(query);
          setArticleCount(resultCount);
          setArticles(data);
      }
      if (topic) {
          console.log("IS FETCHING TOPIC");
          const data = await getTrendingNewsByTopic(topic);
          setArticles(data);
      }
      if (sources) {
        const data = await getTrendingNewsBySource(sources);
        setArticles(data);
      }
    },
    [topic, query, sources]
  );

  const getHeaderText = () => {
    if (topic) {
      return `Top News in ${topic}`;
    }
    if (query) {
      return `Found ${articleCount} articles matching the search: "${query}"`;
    }
    if (sources) {
      return `Trending News from ${sources}`
    }
    return `Cool Articles`;
  }

  return (
    <>
      <header>
        <h1 className="band-intro-heading">{getHeaderText()}</h1>
      </header>
      <motion.div
        className="band"
        initial={{ y: "100vh" }}
        animate={{ y: "0" }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {articles.map((article, key) => {
          const imgSrc = article["urlToImage"] || DEFAULT_PREVIEW_IMG;
          return (
            <div className={`item-${key + 1}`} key={key}>
              <a href={article.url} className="band-card" target="_blank">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${imgSrc})`,
                  }}
                ></div>
                <article>
                  <h1>{article.title}</h1>
                  <span>{article.source.name}</span>
                  <span>ON {formatDate(article.publishedAt)}</span>
                </article>
              </a>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
