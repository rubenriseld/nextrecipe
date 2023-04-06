import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './header'
import Ad from './Ad'
import RecipeCard from './recipecard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header></Header>
    <Ad></Ad>
    <RecipeCard></RecipeCard>
  </React.StrictMode>,
)
