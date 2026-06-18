
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
            <h2 className='text'>Быстрый фильтр:</h2>
            <select name="fastFilter" id="fast"
              onChange={(e) => {
                props.actionFilter.setFastFilter(e.target.value)
              }}>
              <option className='text' value="0">Популярные</option>
              <option className='text' value="1">Новинки</option>
              <option className='text' value="2">Сначала дешевые</option>
              <option className='text' value="3">Сначала дорогие</option>
            </select>
          </div>
          <div className={styles.fast}>
            <h2 className='text'>Категории:</h2>
            <select name="categoryFilter" id="category"
              onChange={(e) => {
                props.actionFilter.setSelectedCategories(e.target.value)
              }}>
              <option className='text' value="all">Все</option>
              <option className='text' value="electronics">Электроника</option>
              <option className='text' value="jewelery">Ювелирные изделия</option>
              <option className='text' value="men's clothing">Мужская Одежда</option>
              <option className='text' value="women's clothing">Женская Одежда</option>
            </select>
          </div>
        </div>
      </div>
    </div >
  )
}