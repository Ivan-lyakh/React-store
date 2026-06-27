import styles from '../css/ProductBody.module.css'
import { useFilter } from '../hooks/useFitler'
import { useProduct } from '../hooks/useProduct'
import { type Product } from '../types/ProductTypes'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from './SkeletonCard'
import { Error } from './Error'
import { Filter } from './Filter'
import { useSelector } from 'react-redux'



export const ProductBody = () => {

  const allProduct = useSelector(
    (state: any) => state.products.products
  )

  const { error, loading, resetError, originalAllProduct } = useProduct()

  const { actionFilter } = useFilter(originalAllProduct)

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