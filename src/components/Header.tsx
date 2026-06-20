import styles from '../css/Header.module.css'
import { useDispatch } from 'react-redux'
import { resetSelectedProduct } from '../sliceStore/selectedProduct'
import { Link } from 'react-router-dom'


export function Header() {

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
        </div>
      </div>
    </div>
  )
}