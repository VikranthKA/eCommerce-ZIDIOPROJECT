import React from 'react'
import { useAppSelector } from '../react-redux/hooks/reduxHooks'
import { Container } from '@mui/material'
import ProductCard from '../components/Products/ProductCard'

const Cart = () => {
    const {cartItems} = useAppSelector((state)=>state.cart   )
    console.log(cartItems,"cart")
  return (
    <div>
    <Container>
      {
        cartItems.products.length > 0 && <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
{cartItems.products.map((product) => (
    <ProductCard key={product.id} {...product.productId

    } />
))}



        </div>
      }
    </Container>
        
      
    </div>
  )
}

export default Cart
