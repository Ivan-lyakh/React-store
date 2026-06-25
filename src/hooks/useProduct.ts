import { useEffect, useState } from "react"
import { getProduct } from "../dal/api"
import type { Product } from "../types/ProductTypes"
import { useDispatch } from "react-redux";
import { setProducts } from "../sliceStore/product";

export const useProduct = () => {

  const dispatch = useDispatch();

  const [allProduct, setAllProduct] = useState<Product[]>([])

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

        dispatch(setProducts(data));

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

  return { allProduct, error, loading, resetError, setAllProduct, originalAllProduct }

}