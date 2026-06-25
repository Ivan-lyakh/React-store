import styles from '../css/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedProduct } from '../sliceStore/selectedProduct'
import { Link } from 'react-router-dom'
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ActionUsers } from '../hooks/useUsers'
import cartImages from '../images/cart.png'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/ProductTypes'
import type { CartItem } from '../sliceStore/Cart'



type Props = {
  setAuthOpen: Dispatch<SetStateAction<boolean>>
  actionUsers: ActionUsers
}

export function Header(props: Props) {

  const { actionCart } = useCart()

  const [cartOpen, setCartOpen] = useState(false)

  const cart = useSelector(
    (state: any) => state.cart.items
  )

  const products = useSelector(
    (state: any) => state.products.products
  )

  const cartIds = new Set(
    cart.map((item: CartItem) => item.product_id)
  )

  const cartProducts = products.filter((product: Product) =>
    cartIds.has(product.id)
  )

  const user = useSelector(
    (state: any) => state.user.users
  );

  console.log("cart", cart)
  console.log("products", products)
  console.log("cartProducts", cartProducts)



  useEffect(() => {


    if (!user) return

    actionCart.loadCart()

  }, [user])


  const dispatch = useDispatch()

  return (
    <div
      className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <Link to='/'>
            <div
              onClick={() => dispatch(resetSelectedProduct())}
              className={styles.logo}>
              <h2 className='title'>Header</h2>
            </div>
          </Link>
          <div>
            {user === null ?
              <div className={styles.logout}>
                <button onClick={() => props.setAuthOpen(true)}>Войти</button>
              </div>
              :
              <div className={styles.logout}>

                <div className={styles.userName}>
                  <h2>{user.user_metadata.name}</h2>
                </div>

                <div className={styles.bodyCartImg}>
                  <h2 className={styles.lengthCart}>{cartProducts.length}</h2>
                  <img
                    onClick={() => setCartOpen(prev => !prev)}
                    src={cartImages} alt="#" />
                  {cartOpen &&
                    <div className={styles.cart}>
                      {cartProducts.length === 0 ? "Корзина пуста!" : ''}
                      <ul>
                        {cartProducts.map((item: Product) => {
                          return (
                            <li key={item.id}>
                              <div className={styles.cartImages}>
                                <img src={item.image} alt="#" />
                              </div>
                              {item.title.split(" ")
                                .slice(0, 3)
                                .join(" ")}
                              <button
                                onClick={async () => {
                                  console.log(item)
                                  console.log("ID товара:", item.id)

                                  await actionCart.removeProduct(
                                    user.id,
                                    item.id
                                  )
                                }}
                              >
                                ❌
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>}
                </div>

                <button onClick={() => props.actionUsers.handleLogout()}>Выйти</button>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}