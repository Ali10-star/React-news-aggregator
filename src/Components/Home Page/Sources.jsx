import getNewsSources from "../../Utils/get-sources";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, createSearchParams } from "react-router-dom";


const newsSources = await getNewsSources();

function SourcesDisplay() {
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);

  useEffect(() => {
    setSources(newsSources);
  }, []);

  if (!sources) {
    return (
      <section className="shadow-sm section" id="trending-panel">
      <div className="container">
        <h1>No Sources Found :(</h1>
      </div>
      </section>
    )
  }
  return (
    <section id="sources-panel" className="bg-light p-1 shadow-sm sources-panel section">
      <div className="container mt-2 mx-auto">
        <h1>News Sources</h1>
        <div className="d-flex flex-row flex-wrap gap-1 mx-auto">
          {sources.map((source, key) => {
            const params = {
              sources: source.id
            };
            const pillIdx = (Math.floor(Math.random() * key) % 4) + 1;
            return (
              <motion.button
                key={key}
                className={`source-pill pill${pillIdx} p-1 justify-end`}
                whileHover={{
                  scale: 1.08,
                }}
              >
                <span
                  className="link-secondary link-offset-2 no-underline"
                  onClick={() => navigate({
                    pathname: "/articles",
                    search: `?${createSearchParams(params)}`,
                  })}
                >
                  {source.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SourcesDisplay;
