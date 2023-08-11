import { formatDate } from "../../Utils/format-data";
import {
  getTrendingNews,
  getTrendingSportsNews,
  getTrendingScienceNews,
} from "../../Utils/fetch-news";
import getClientCountryInfo from "../../Utils/country-codes";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const articles = await getTrendingNews();
const sportsArticlesData = await getTrendingSportsNews();
const scienceArticlesData = await getTrendingScienceNews();
const { clientCountry } = getClientCountryInfo();

const DEFAULT_PREVIEW_IMG = "/assets/default-preview-image.svg";

const AnimatedButton = (props) => {
  return (
    <motion.button
      className={props.className}
      whileHover={{ scale: props.hoverScale }}
      whileTap={{ scale: props.tapScale }}
      onClick={props.clickHandler}
    >
      {props.children}
    </motion.button>
  );
};

function ArticlePreviewCard({ article }) {
  const imgSrc = article["media"] || DEFAULT_PREVIEW_IMG;
  return (
    <div className="card card-fixed">
      <img src={imgSrc} className="card-img-top art-preview-img" alt="" />
      {/* Card body */}
      <div className="card-body p-4">
        <h6 className="card-title">{article.title}</h6>
        <div className="">
          <AnimatedButton
            className="btn btn-themed-muted"
            clickHandler={() => null}
            hoverScale={1.1}
            tapScale={0.8}
          >
            <Link
              className="link-secondary link-offset-2 no-underline"
              to={`/article/${encodeURIComponent(JSON.stringify(article))}`}
            >
              {" "}
              View{" "}
            </Link>
          </AnimatedButton>
        </div>
      </div>
      {/* Card body */}

      {/* Card footer */}
      <div className="card-footer py-1 text-body-secondary">
        {formatDate(article.published_date)}
        <br />
        <motion.a
          href={article["link"]}
          target="_blank"
          className="btn btn-sm btn-themed mt-1"
          rel="noreferrer"
          whileHover={{
            scale: 1.2,
            textShadow: "0px 0px 8px rgb(33, 72, 83)",
          }}
        >
          Go to Original Article
        </motion.a>
      </div>
      {/* Card footer */}
    </div>
  );
}

function TrendingCarousel({ articles, category = "", id, clientCountry }) {
  return (
    <div>
      <h4>
        Trending {category} News in {clientCountry}
      </h4>
      <div
        id={id}
        className="carousel carousel-dark slide" //carousel-dark
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {articles.map((article, key) => {
            return key === 0 ? (
              <div key={article} className="carousel-item active">
                <ArticlePreviewCard article={article} />
              </div>
            ) : (
              <div key={key} className="carousel-item">
                <ArticlePreviewCard article={article} />
              </div>
            );
          })}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

function TrendingPanel() {
  const [generalArticles, setGeneralArticles] = useState([]);
  const [sportsArticles, setSportsArticles] = useState([]);
  const [scienceArticles, setScienceArticles] = useState([]);
  const [country, setCountry] = useState("usa");

  useEffect(() => {
    setCountry(clientCountry);
    setGeneralArticles(articles);
    setSportsArticles(sportsArticlesData);
    setScienceArticles(scienceArticlesData);
  }, []);

  if (!generalArticles) {
    return (
      <section className="shadow-sm section" id="trending-panel">
      <div className="container">
        <h1>No Articles Found :(</h1>
      </div>
      </section>
    )
  }

  return (
    <section className="shadow-sm section" id="trending-panel">
      <div className="container">
        <div className="row pt-3">
          <div className="col-12 col-md mb-3">
            <TrendingCarousel
              articles={generalArticles}
              id="generalCarousel"
              clientCountry={country}
            />
          </div>
          <div className="col-12 col-lg-4 col-md mb-3">
            <TrendingCarousel
              articles={sportsArticles}
              category="Sports"
              id="sportsCarousel"
              clientCountry={country}
            />
          </div>
          <div className="col-12 col-md mb-3">
            <TrendingCarousel
              articles={scienceArticles}
              category="Science"
              id="scienceCarousel"
              clientCountry={country}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default TrendingPanel;
