import { useSelector } from "react-redux"
import type { Info } from "../sliceStore/info"
import styles from '../css/Info.module.css'

export const InfoComponent = () => {

  const info = useSelector(
    (state: any) => state.info.info
  )

  console.log(info)


  return (
    <ul className={styles.infoList}>
      {info.map((item: Info) => (
        <li
          key={item.id}
          className={
            item.success
              ? styles.success
              : styles.error
          }
        >
          {item.text}
        </li>
      ))}
    </ul>
  )
}