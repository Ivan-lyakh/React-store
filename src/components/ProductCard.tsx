import type { Product } from "../types/ProductTypes"
import styles from '../css/ProductCard.module.css'
import { memo } from "react"
import { useDispatch } from "react-redux"
import { setSelectedProduct } from "../sliceStore/selectedProduct"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from '../store/store'
import { useCart } from "../hooks/useCart"
import { useInfo } from "../hooks/useInfo"


type Props = {
  product: Product
}

export function controlRaiting(value: number) {

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


  const { showInfo } = useInfo();

  const user = useSelector((state: RootState) => state.user.users);

  const { actionCart } = useCart()

  const dispatch = useDispatch()

  const navigate = useNavigate();

  return (

    <div className={styles.card}>

      <div className={styles.wrapper}>

        <div onClick={() => {
          dispatch(setSelectedProduct(product))
          navigate(`/product/${product.id}`)
        }}>
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
        </div>

        <div className={styles.button}>
          <h3 className='text'>{product.price}$</h3>
          <button
            className="text"
            onClick={async () => {

              if (user === null) {

                showInfo(
                  "Необходимо авторизоваться",
                  false
                )

                return
              }

              await actionCart.check(
                user.id,
                product.id
              )

            }}
          >
            Add to cart
          </button>
        </div>
      </div>

    </div>
  )
}


export default memo(ProductCard);