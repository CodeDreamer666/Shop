import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Cart from "./components/Cart.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)