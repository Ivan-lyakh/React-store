import styles from '../css/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedProduct } from '../sliceStore/selectedProduct'
import { Link } from 'react-router-dom'
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ActionUsers } from '../hooks/useUsers'
import cartImages from '../images/cart.png'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/ProductTypes'
import type { CartItem } from '../sliceStore/cart'
import { resetCart } from '../sliceStore/cart'
import { useRef } from "react";
import { useInfo } from '../hooks/useInfo'


type Props = {
  setAuthOpen: Dispatch<SetStateAction<boolean>>
  actionUsers: ActionUsers
}

export function Header(props: Props) {

  const { showInfo } = useInfo();

  const { actionCart } = useCart()

  const cartRef = useRef<HTMLDivElement | null>(null);

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

  const totalPrice = cart.reduce((sum: number, cartItem: CartItem) => {

    const product = products.find(
      (p: Product) => p.id === cartItem.product_id
    )

    if (!product) return sum

    return sum + product.price * cartItem.quantity

  }, 0)

  const user = useSelector(
    (state: any) => state.user.users
  );

  const getNumberOfItems = (actualProduct: Product) => {

    const result: CartItem = cart.find((element: CartItem) => element.product_id === actualProduct.id);

    return result.quantity

  }


  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        cartRef.current &&
        !cartRef.current.contains(
          event.target as Node
        )
      ) {
        setCartOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

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
                    <div
                      ref={cartRef}
                      className={styles.cart}>
                      <div className={styles.cartTotal}>
                        <h2>Общая стоимость корзины: <span>{Math.round(totalPrice)}$</span></h2>
                        <div className={styles.bodyButton}>
                          <button className={styles.addCount}>Оплатить </button>
                          <button
                            className={styles.remodeCount}
                            onClick={() => {
                              actionCart.clearCart(user.id)
                              dispatch(resetCart())
                            }}
                          >Очистить </button>
                        </div>
                      </div>
                      {cartProducts.length === 0 ? "Корзина пуста!" : ''}
                      <ul>
                        {cartProducts.map((item: Product) => {

                          return (
                            <li key={item.id}>

                              <div className={styles.box}>
                                <div className={styles.cartInfo}>
                                  <div className={styles.cartImages}>
                                    <img src={item.image} alt="#" />
                                  </div>
                                  <h2>{item.price}$</h2>
                                </div>

                                <h2>
                                  {item.title.split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                </h2>
                              </div>

                              <div className={styles.count}>

                                <button
                                  className={styles.addCount}
                                  onClick={async () => {

                                    await actionCart.check(
                                      user.id,
                                      item.id
                                    )
                                  }}
                                >
                                  +
                                </button>

                                <h2>{getNumberOfItems(item)}</h2>

                                <button
                                  className={styles.remodeCount}
                                  onClick={async () => {

                                    showInfo(
                                      "Количество товара уменьшено на 1",
                                      false
                                    )

                                    await actionCart.removeProduct(

                                      user.id,
                                      item.id,

                                    )
                                  }}
                                >
                                  -
                                </button>
                              </div>

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