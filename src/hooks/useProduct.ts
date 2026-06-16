import { useEffect, useState } from "react"
import { getProduct } from "../dal/api"


export const useProduct = () => {

  const [allProduct, setAllProduct] = useState([])

  const [error, setError] = useState(false)

  useEffect(() => {

    async function loadData() {

      try {
        const data = await getProduct()

        setAllProduct(data)

      }

      catch (error) {
        console.log(`тестовая ошибка:${error}`)
        setError(true)
      }

    }

    loadData()

  }, [])




  return { allProduct , error }

}