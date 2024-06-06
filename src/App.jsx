import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Topics from './components/Topics';
import ErrorPage from './components/ErrorPage';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import { LoggedOnUserProvider } from './contexts/LoggedOnUser';

function App() {

  return (
    <LoggedOnUserProvider>
      <Header />
      <Routes>
        <Route path="" element={<AllArticles />} />
        <Route path="/" element={<AllArticles />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="*" element={<ErrorPage data={{ message: "Path not found" }} />} />
      </Routes>
      <Footer />
    </LoggedOnUserProvider>
  )
}

export default App
