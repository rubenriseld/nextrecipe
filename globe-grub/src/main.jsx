import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/header'
import Ad from './components/ad'
import RecipeCard from './components/recipecard'
import Footer from './components/footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header></Header>
    <Ad></Ad>
    <RecipeCard></RecipeCard>
    <Footer />
  </React.StrictMode>,
)
