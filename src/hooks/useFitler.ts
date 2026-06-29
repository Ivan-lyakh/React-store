import { useEffect, useState } from "react"
import { type Dispatch, type SetStateAction } from "react"
import type { Product } from "../types/ProductTypes"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../sliceStore/product"


export type ActionFilter = {
  setFastFilter: Dispatch<SetStateAction<string>>
  setSelectedCategories: Dispatch<SetStateAction<string>>
}

export const useFilter = (originalAllProduct: Product[]) => {

  const dispatch = useDispatch()

  const allProduct = useSelector(
    (state: any) => state.products.products
  )

  const [fastFilter, setFastFilter] = useState<string>("")

  const [selectedCategories, setSelectedCategories] = useState("")

    const sort: Record<string, () => Product[]> = {
    0: () => [...allProduct].sort((a: Product, b: Product) => b.rating.count - a.rating.count),
    1: () => [...allProduct].sort((a: Product, b: Product) => b.id - a.id),
    2: () => [...allProduct].sort((a: Product, b: Product) => a.price - b.price),
    3: () => [...allProduct].sort((a: Product, b: Product) => b.price - a.price)
  }

  useEffect(() => {

    function loadData() {

      if (selectedCategories === "all") {
        dispatch(setProducts(originalAllProduct))
        return
      }

      const filteredArray = originalAllProduct.filter((item: Product) => item.category === selectedCategories)

      dispatch(setProducts([...filteredArray]))
    }

    loadData()

  }, [selectedCategories])

  useEffect(() => {

    if (fastFilter === "") {
      return
    }

    const action = sort[Number(fastFilter)]

    const filteredArr: Product[] = action()

    dispatch(setProducts(filteredArr))

  }, [fastFilter])



  const actionFilter = { setFastFilter, setSelectedCategories }

  return { fastFilter, actionFilter }
}