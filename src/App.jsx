import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Product from './pages/ProductPage'

const App = () => {
  return (
    <div>
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
    </div>
  )
}

export default App