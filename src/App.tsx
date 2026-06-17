import { Header } from "./components/Header"
import { ProductBody } from "./components/ProductBody"
import { Footer } from "./components/Footer"

export function App() {
  return (
    <div className="wrapper">
        <Header />
        <ProductBody />
        <Footer />
    </div>
  )
}