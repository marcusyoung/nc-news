import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Topics from './components/Topics';
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
      </Routes>
      <Footer />
    </LoggedOnUserProvider>
  )
}

export default App
