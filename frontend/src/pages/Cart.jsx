import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../react-redux/hooks/reduxHooks';
import { Box, Button, CardMedia, Container, Divider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CartCard from '../components/Cart/CartCard';
import { getLoginedUserProfile } from '../react-redux/slices/actions/profileActions';
import { getAllCartItems } from '../react-redux/slices/actions/cartItemsActions';
import OrderCheckOut from '../components/Orders/OrderCheckOut';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const userData = useAppSelector(state=>state.user)

  const dispatch  = useAppDispatch()

  useEffect(()=>{
    if(userData?.decodedData?.role){
      dispatch(getLoginedUserProfile())
      dispatch(getAllCartItems())
    }
  },[userData?.decodedData])

  const navigate = useNavigate()

  return (
    <>
   {cartItems.products.length > 0 ? <><Container sx={
      { 
        mt: 6,
        mb:6
      }
    }>
      <TableContainer component={Paper}>
        <Table sx={{ width:"100%" }} aria-label="cart table">
          <TableHead sx={{}}>
            <TableRow>
              <TableCell align="left"><Typography>Products</Typography></TableCell>

              <TableCell align="left" >
                <Typography sx={{ ml: 5 }}>Quantity</Typography></TableCell>
              <TableCell align="left"><Typography>Price (₹)</Typography></TableCell>
              <TableCell align="left"><Typography>Discount (%)</Typography></TableCell> 
              <TableCell align="left"><Typography>Total (₹)</Typography></TableCell>

            </TableRow> 
          </TableHead>
          <TableBody>
            {cartItems.products.map((product, index) => (
              <CartCard key={index} {...product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={()=>navigate("/checkout")}>CheckOut</Button>
    </Container>

    
 </>: <h1>Cart Empty Add some recomended products</h1>}
    </>
  );
};

export default Cart