import { Header } from "./components/Header"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { Footer } from "./components/Footer"
import { Routes, Route } from "react-router-dom"
import { getProduct } from "./dal/api"

import { Home } from "./pages/Home"
import { useState } from "react"
import { Auth } from "./components/Auth"
import { useUsers } from "./hooks/useUsers"
import { Info } from "./components/Info"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProducts } from "./sliceStore/product";


export function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    async function loadProducts() {

      const data = await getProduct()

      dispatch(setProducts(data))

    }

    loadProducts()

  }, [])

  const [authOpen, setAuthOpen] = useState(false)

  const { actionUsers } = useUsers()

  if (authOpen) {
    return <Auth
      setAuthOpen={setAuthOpen}
      actionUsers={actionUsers}
    />
  }

  return (
    <div className="wrapper">
      <Header
        actionUsers={actionUsers}
        setAuthOpen={setAuthOpen}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />
      </Routes>

      <Info />

      <Footer />

    </div>
  )
}