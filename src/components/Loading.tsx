
import styles from '../css/Loading.module.css'


export const Loading = () => {


  return (
    <div className={styles.error}>
      <div className='container'>
        <div className={styles.body}>
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  )
}