import type { Product } from "../types/ProductTypes"
import styles from '../css/ProductCard.module.css'

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

export const ProductCard = (props: Props) => {

  const product = props.product

  return (

    <div className={styles.card}>

      <div className={styles.img}>
        <img src={product.image} alt="#" />
      </div>

      <div className={styles.raiting}>
        <h2>{controlRaiting(product.rating.rate)}</h2>
        <h2>({product.rating.count})</h2>
      </div>

      <div className={styles.body}>
        <h2>{product.title}</h2>
        <h3>{product.price}</h3>
      </div>

      <div className={styles.button}>
        <button>
          Add to cart
        </button>
      </div>

    </div>
  )
}