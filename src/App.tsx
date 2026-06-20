import { Header } from "./components/Header"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { Footer } from "./components/Footer"
import { Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"


export function App() {
  return (
    <div className="wrapper">
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />
      </Routes>

      <Footer />
    </div>
  )
}