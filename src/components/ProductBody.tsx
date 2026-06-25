import styles from '../css/ProductBody.module.css'
import { useFilter } from '../hooks/useFitler'
import { useProduct } from '../hooks/useProduct'
import { type Product } from '../types/ProductTypes'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from './SkeletonCard'
import { Error } from './Error'
import { Filter } from './Filter'




export const ProductBody = () => {

  const { allProduct, error, loading, resetError, setAllProduct, originalAllProduct } = useProduct()

  const { actionFilter } = useFilter(allProduct, setAllProduct, originalAllProduct)

  if (error) {
    return (
      <Error
        resetError={resetError}
      />
    )
  }

  return (
    <div className={styles.body}>
      <Filter
        actionFilter={actionFilter}
      />
      <div className="container">
        <div className={styles.grid}>

          {allProduct.map((item: Product) => {
            return (
              loading === false
                ?
                <ProductCard
                  key={item.id}
                  product={item}
                />
                : <SkeletonCard
                  key={item.id}
                />
            )
          })}

        </div>
      </div>

    </div>
  )


}