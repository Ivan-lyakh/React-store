import styles from '../css/ProductBody.module.css'
import { useProduct } from '../hooks/useProduct'
import { type Product } from '../types/ProductTypes'
import { ProductCard } from './ProductCard'


export const ProductBody = () => {

  const { allProduct , error } = useProduct()


  return (
    <div className={styles.body}>
      <div className="container">
        <div className={styles.grid}>

          {allProduct.map((item: Product) => {
            return (
              <ProductCard
                key={item.id}
                product={item}
              />
            )
          })}

        </div>
      </div>
    </div>
  )


}