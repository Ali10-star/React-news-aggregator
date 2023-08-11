import { useParams } from "react-router-dom";

const DEFAULT_PREVIEW_IMG = "/assets/icons/book-half.svg";

export default function Article() {
  const { articleData } = useParams();
  const parsedArticle = JSON.parse(decodeURIComponent(articleData));
  const imgSrc = parsedArticle["urlToImage"] || DEFAULT_PREVIEW_IMG;
  return (
    <div className="p-5">
      <img src={imgSrc} alt="" style={{ maxWidth: "50%" }} />
      <h1>{parsedArticle.title}</h1>
      <h4>
        By {parsedArticle.author} on {parsedArticle.publishedAt}{" "}
      </h4>
      <p>{parsedArticle.description}</p>
      <a href={parsedArticle["url"]} className="btn btn-outline-success">
        Read full article on {parsedArticle["source"]["name"]}
      </a>
    </div>
  );
}
