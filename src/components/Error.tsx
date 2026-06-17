import styles from '../css/Error.module.css'

type Props = {
  resetError: (value: boolean) => void
}

export const Error = ({ resetError }: Props) => {


  return (
    <div className={styles.error}>
      <div className='container'>
        <div className={styles.body}>
          <h2>Что-то пошло не так :/</h2>
          <button onClick={() => {
            resetError(false)
            window.location.reload()
          }
          }>Попробовать еще раз</button>
        </div>
      </div>
    </div>
  )
}