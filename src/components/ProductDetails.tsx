import styles from '../css/ProductDetails.module.css'
import type { Product } from '../types/ProductTypes'
import { controlRaiting } from './ProductCard'
import { useSelector } from 'react-redux'
import { useCart } from '../hooks/useCart'
import { useEffect } from 'react'

type Props = {
  product: Product
}


export const ProductDetails = ({ product }: Props) => {


  const user = useSelector(
    (state: any) => state.user.users
  );


  const { actionCart } = useCart()


  return (
    <div className={styles.detail}>
      <div className='container'>

        <div className={styles.body}>

          <div className={styles.images}>
            <img src={product.image} alt="#" />
          </div>

          <div className={styles.info}>
            <div className={styles.title}>
              <h2 className='title'>{product.title}</h2>
            </div>
            <div className={styles.raiting}>
              <h2>{controlRaiting(product.rating.rate)}</h2>
              <h2 className='text'>({product.rating.count})</h2>
            </div>
            <div className={styles.about}>
              <p className='text'>{product.description}</p>
            </div>
            <div className={styles.price}>
              <h2 className='title'>{product.price}$</h2>
              <button
                className={styles.button}
                onClick={async () => {

                  if (user === null) {
                    throw new Error("Что бы добавить товар в корзину , нужно авторизоваться!")
                  }

                  try {
                    await actionCart.check(user.id, product.id)
                  }

                  catch (error) {
                    console.log(error)
                  }

                }
                }
              >Add to card</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}