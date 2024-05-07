import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AllArticles from './components/AllArticles'

function App() {

  const [loggedOnUser, SetLoggedOnUser] = useState("tickle122")

  return (
    <>
      <Header />
      <AllArticles />
      <Footer />
    </>
  )
}

export default App
