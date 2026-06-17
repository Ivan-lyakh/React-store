import styles from '../css/Seketon.module.css'




export const SkeletonCard = () => {

  return (
    <div className={styles.card}>

      <div className={styles.img}>
        <span></span>
      </div>

      <div className={styles.raiting}>
        <span></span>
      </div>

      <div className={styles.price}>
        <span></span>
      </div>


      <div className={styles.button}>
        <button>
          Add to cart
        </button>
      </div>

    </div>
  )
}