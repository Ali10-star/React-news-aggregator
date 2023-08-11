import { motion } from "framer-motion";
import getClientCountryInfo from "../Utils/country-codes";
import { useNavigate, createSearchParams } from "react-router-dom";

const { countryCode } = getClientCountryInfo();

const SmallScreenInput = () => (
  <motion.input
    type="search"
    name="q"
    placeholder="Search..."
    className="form-control search-box form-control-dark text-bg-dark"
    aria-label="Search"
  />
);

const LargeScreenInput = () => (
  <motion.input
    type="search"
    name="q"
    placeholder="Search..."
    className="form-control search-box form-control-dark text-bg-dark"
    aria-label="Search"
    whileFocus={{ width: "450px" }}
  />
);

const AppLogo = () => (
  <motion.img
    src="/assets/icons/icon-col-96.png"
    alt="Bootstrap"
    width={50}
    height={50}
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 250, 250, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
  />
);

export default function NavBar() {
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    const params = {
      q: searchQuery
    };
    navigate({
      pathname: "/articles",
      search: `?${createSearchParams(params)}`,
    });
  }

  return (
    <header className="p-3 text-bg-dark rounded-sm">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center -ml-20 mb-2 mb-lg-0 mx-2 text-white text-decoration-none"
          >
            <AppLogo />
          </a>

          <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <button className="button-nav" onClick={() => navigate('/topics')}>
                Browse Topics{" "}
              </button>
          </div>

          <form
            action=""
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-2"
            role="search"
            onSubmit={(event) => handleSearch(event.target.value)}
          >
            {window.innerWidth >= 992 ? (
              <LargeScreenInput />
            ) : (
              <SmallScreenInput />
            )}
          </form>

          <div className="text-end"></div>
        </div>
      </div>
    </header>
  );
}
