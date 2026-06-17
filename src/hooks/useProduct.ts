import { useEffect, useState } from "react"
import { getProduct } from "../dal/api"


export const useProduct = () => {

  const [allProduct, setAllProduct] = useState([])

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  function resetError() {
    setError(false)
  }

  useEffect(() => {

    async function loadData() {

      try {

        setLoading(true)

        const data = await getProduct()

        setAllProduct(data)

      }

      catch (error) {
        console.log(`тестовая ошибка:${error}`)
        setError(true)
      }

      finally {
        setLoading(false)
      }

    }

    loadData()

  }, [])


  return { allProduct, error, loading, resetError , setAllProduct }

}