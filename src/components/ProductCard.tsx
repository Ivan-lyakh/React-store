import type { Product } from "../types/ProductTypes"
import styles from '../css/ProductCard.module.css'
import { memo } from "react"

type Props = {
  product: Product
}

function controlRaiting(value: number) {

  const rating = Math.round(value)

  const stars: Record<number, string> = {
    1: "⭐☆☆☆☆",
    2: "⭐⭐☆☆☆",
    3: "⭐⭐⭐☆☆",
    4: "⭐⭐⭐⭐☆",
    5: "⭐⭐⭐⭐⭐"
  }

  return stars[rating]

}

export const ProductCard = ({ product }: Props) => {


  return (

    <div className={styles.card}>

      <div className={styles.wrapper}>
        <div className={styles.img}>
          <img src={product.image} alt="#" />
        </div>

        <div className={styles.raiting}>
          <h2>{controlRaiting(product.rating.rate)}</h2>
          <h2 className='text'>({product.rating.count})</h2>
        </div>

        <div className={styles.body}>
          <h2 className='title'>{product.title}</h2>
        </div>

        <div className={styles.button}>
          <h3 className='text'>{product.price}$</h3>
          <button className="text">
            Add to cart
          </button>
        </div>
      </div>

    </div>
  )
}


export default memo(ProductCard);