import React from 'react'
import { useAppSelector } from '../../react-redux/hooks/reduxHooks'
import ProductCard from './ProductCard'
import { Container } from '@mui/material'

const AllProducts = () => {
    const {products} = useAppSelector((state)=>state.products)
  return (
    <Container>
      {
        products.length > 0 && <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
{products.map((product) => (
    <ProductCard key={product.id} {...product} />
))}



        </div>
      }
    </Container>
  )
}

export default AllProducts
