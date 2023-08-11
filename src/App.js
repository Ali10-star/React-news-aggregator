import './App.css';
import NavBar from './Components/Header';
import Footer from './Components/Footer';
import TrendingPanel from './Components/Home Page/Trending';
import SourcesDisplay from './Components/Home Page/Sources';
import IntroPanel from './Components/Home Page/Intro';
import Article from './Components/Article';
import TopicsPanel from './Components/Topics/Topics';

// Third party packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleView from './Components/ArticleView';

// arabic text:
// style={{ direction: "rtl", textAlign: "right" }}

const HomePage = () => {
  return (
    <>
      <IntroPanel />
      <TrendingPanel />
      <SourcesDisplay />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPanel />} />
          <Route path="/article/:articleData" element={<Article />}></Route>
          <Route path="/articles" element={<ArticleView />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
