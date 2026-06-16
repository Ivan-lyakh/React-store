export type Product = {
  title: string,
  id: number,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { count: number , rate: number }
}