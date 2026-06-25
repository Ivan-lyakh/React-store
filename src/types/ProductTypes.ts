export type Product = {
  title: string,
  id: number,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { count: number , rate: number }
}

export type CartItem = {
  id: string , 
  user_id: string , 
  quantity: number,
  product_id: number
}