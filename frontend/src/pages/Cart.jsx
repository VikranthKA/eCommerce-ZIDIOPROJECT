import React from 'react'
import { useAppSelector } from '../react-redux/hooks/reduxHooks'
import { Container } from '@mui/material'
import ProductCard from '../components/Products/ProductCard'
import CartCard from '../components/Cart/CartCard'


const Cart = () => {
    const {cartItems} = useAppSelector((state)=>state.cart )
    console.log(cartItems,"cart")
  return (
    <div>
    <Container>
      {
        cartItems.products.length > 0 && <div style={{display:"flex",flexDirection:"column",justifyContent:"center",flexWrap:"wrap"}}>
{cartItems.products.map((product,index) => (
    <div><CartCard key={index} {...product}/></div>
))}



        </div>
      }
    </Container>
        
      
    </div>  
  )
}

export default Cart
