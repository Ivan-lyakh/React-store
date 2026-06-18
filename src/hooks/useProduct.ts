import { useEffect, useState } from "react"
import { getProduct } from "../dal/api"
import type { Product } from "../types/ProductTypes"


export const useProduct = () => {

  const [allProduct, setAllProduct] = useState<Product[]>([])

  console.log(allProduct)

  const [originalAllProduct, setoriginalAllProduct] = useState<Product[]>([])

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

        setoriginalAllProduct(data)

      }

      catch (error) {
        console.log(`получение товаров:${error}`)
        setError(true)
      }

      finally {
        setLoading(false)
      }

    }

    loadData()

  }, [])

  return { allProduct, error, loading, resetError, setAllProduct , originalAllProduct }

}