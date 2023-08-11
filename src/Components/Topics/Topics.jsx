import { motion } from "framer-motion";
import { createSearchParams, useNavigate } from "react-router-dom";

import { ICONS, DEFAULT_ICON } from "./Icons";
const TOPICS = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Topic = ({ title }) => {
  const navigate = useNavigate();
  const params = {
    topic: title,
  };

  return (
    <div className={`topic topic-${title} m-4`}>
      {ICONS[title] || DEFAULT_ICON}
      <div className="topic__content">
        <p
          className="topic__title"
          onClick={() => {
            navigate({
              pathname: "/articles",
              search: `?${createSearchParams(params)}`,
            });
          }}
          style={{ cursor: "pointer" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default function TopicsPanel() {
  return (
    <>
      <h1 className="mt-2">Topics</h1>
      <motion.div className="container"
          initial={{ y: "100vh" }}
          animate={{ y: "0" }}
          transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="topic-row row row-cols-sm-3 row-cols-md-2 row-cols-lg-3">
          {TOPICS.map((topic, key) => (
            <div className="col-sm-12" key={key}>
              <Topic title={topic} />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
