
import styles from '../css/Filter.module.css'
import type { ActionFilter } from '../hooks/useFitler'

type Props = {
  actionFilter: ActionFilter
}

export const Filter = (props: Props) => {

  return (
    <div className={styles.filter}>
      <div className='container'>
        <div className={styles.body}>
          <div className={styles.fast}>
            <h2>Быстрый фильтр:</h2>
            <select name="fastFilter" id="fast"
              onChange={(e) => {
                props.actionFilter.setFastFilter(e.target.value)
              }}>
              <option value="popular">Популярные</option>
              <option value="new">Новинки</option>
              <option value="low">Сначала дешевые</option>
              <option value="height">Сначала дорогие</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}