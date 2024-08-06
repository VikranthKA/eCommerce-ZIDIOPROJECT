import React from 'react'
import { useAppSelector } from '../../react-redux/hooks/reduxHooks'
import ProductCard from './ProductCard'

const AllProducts = () => {
    const {products} = useAppSelector((state)=>state.products)
  return (
    <div>
      {
        products.length > 0 && <div>
{products.map((product) => (
    <ProductCard key={product.id} {...product} />
))}



        </div>
      }
    </div>
  )
}

export default AllProducts
