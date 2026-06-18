import styles from '../css/Header.module.css'



export function Header() {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <h2 className='title'>Header</h2>
        </div>
      </div>
    </div>
  )
}