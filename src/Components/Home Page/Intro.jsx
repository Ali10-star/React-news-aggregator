import { motion } from "framer-motion";

const transition = {
  duration: 0.5,
  type: "spring",
  ease: "linear",
  damping: 30,
  stiffness: 100,
};
const IntroPanel = () => {
  return (
    <section className="styled-back">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <motion.div
            className="col-10 col-sm-8 col-lg-6"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            transition={{ ...transition, delay: 1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              className="d-block mx-lg-auto img-fluid"
              id="intro-img"
              alt=""
              loading="lazy"
              title="Photo by AbsolutVision on Unsplash"
              style={{ boxShadow: "0px 0px 4px rgb(0, 0, 0)" }}
            />
          </motion.div>

          <motion.div
            className="col-lg-6"
            initial={{ x: "-100vw" }}
            animate={{ x: "0" }}
            transition={transition}
          >
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-left">
              All The News!
            </h1>
            <p className="lead">
              Welcome to [Website Name], Your Premier Destination for
              Comprehensive News Aggregation! <br />
              At [Website Name], we bring you the latest headlines, breaking
              stories, and in-depth coverage from trusted sources worldwide. Our
              platform serves as your one-stop source for staying informed on
              diverse topics, be it politics, technology, entertainment, sports,
              or global affairs.
            </p>
            <motion.button
              className="btn btn-themed"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                document.getElementById("sources-panel").scrollIntoView()
              }
            >
              Jump to Sources
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroPanel;
