import styles from '../css/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedProduct } from '../sliceStore/selectedProduct'
import { Link } from 'react-router-dom'
import { type Dispatch, type SetStateAction } from "react"
import type { ActionUsers } from '../hooks/useUsers'


type Props = {
  setAuthOpen: Dispatch<SetStateAction<boolean>>
  actionUsers: ActionUsers
}

export function Header(props: Props) {

  const user = useSelector(
    (state: any) => state.user.users
  );



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
                <span>{user.user_metadata.name}</span>
                <button onClick={() => props.actionUsers.handleLogout()}>Выйти</button>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}