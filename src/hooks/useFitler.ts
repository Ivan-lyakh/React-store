import { useEffect, useState } from "react"
import { type Dispatch, type SetStateAction } from "react"
import type { Product } from "../types/ProductTypes"

export type ActionFilter = {
  setFastFilter: Dispatch<SetStateAction<string>>
  setSelectedCategories: Dispatch<SetStateAction<string>>
}

export const useFilter = (allProduct: Product[], setAllProduct: Dispatch<SetStateAction<Product[]>>, originalAllProduct: Product[]) => {

  const [fastFilter, setFastFilter] = useState<string>("")

  const [selectedCategories, setSelectedCategories] = useState("")

  console.log(selectedCategories)

  useEffect(() => {

    function loadData() {

      if (selectedCategories === "all") {
        setAllProduct(originalAllProduct)
        return
      }

      const filteredArray = originalAllProduct.filter((item: Product) => item.category === selectedCategories)

      setAllProduct([...filteredArray])
    }

    loadData()

  }, [selectedCategories])

  const sort: Record<string, () => Product[]> = {
    0: () => [...allProduct].sort((a: Product, b: Product) => b.rating.count - a.rating.count),
    1: () => [...allProduct].sort((a: Product, b: Product) => b.id - a.id),
    2: () => [...allProduct].sort((a: Product, b: Product) => a.price - b.price),
    3: () => [...allProduct].sort((a: Product, b: Product) => b.price - a.price)
  }

  useEffect(() => {

    if (fastFilter === "") {
      return
    }

    const action = sort[Number(fastFilter)]

    const filteredArr: Product[] = action()

    setAllProduct(filteredArr)

  }, [fastFilter])

  const actionFilter = { setFastFilter, setSelectedCategories }

  return { fastFilter, actionFilter }
}