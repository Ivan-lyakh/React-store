

export async function getProduct() {

  const response = await fetch("https://fakestoreapi.com/products")

  if (!response.ok) {
    throw new Error("Ошибка загрузки продуктов!")
  }

  const data = await response.json()

  return data

}


export async function getCattegories() {
  const response = await fetch("https://fakestoreapi.com/products/categories")

  if (!response.ok) {
    throw new Error("Ошибка загрузки категорий!")
  }

  const data = await response.json()

  return data
}