import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, CardMedia, TableCell, TableRow, Typography } from '@mui/material';
import image1 from "../../Assests/image1.jpg";
import { Delete } from '@mui/icons-material';
import { useAppDispatch } from '../../react-redux/hooks/reduxHooks';
import { removeProductFromCart, updateCartItems } from '../../react-redux/slices/actions/cartItemsActions';

function findTheSizeAndColor(arr, id) {
  return arr.find((sz) => sz._id === id)
}

const CartCard = ({ ...product }) => {
  const [updateProduct, setUpdateProduct] = useState({})
  const [cartCount, setCartCount] = useState(1)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setUpdateProduct(findTheSizeAndColor(product.productId.sizesAndColors, product.quantity.sc_id));
    setCartCount(product.quantity.count)
  }, [product.productId, product.quantity])


  const handleIncrease = useCallback(() => {
    setCartCount((prevCount) => {
      const newCount = prevCount + 1;
      dispatch(updateCartItems(product.productId._id, product.quantity.sc_id, newCount));
      return newCount
    });
  }, [dispatch, product.productId._id, product.quantity.sc_id]);

  const handleDecrease = useCallback(() => {
    setCartCount((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1
        dispatch(updateCartItems(product.productId._id, product.quantity.sc_id, newCount));
        return newCount;
      }
      return prevCount;
    });
  }, [dispatch, product.productId._id, product.quantity.sc_id])



  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            height="100"
            image={product.productId.images ? product.productId.images : image1}
            alt="Product Image"
            sx={{ objectFit: 'contain', width: 100, borderRadius: 2, marginRight: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">{product.productId.name}</Typography>
            <Typography>SIZE: {updateProduct?.size}</Typography>
            <Typography>COLOR: {updateProduct?.color}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center", mr: 0 }}>
          <Button sx={{ fontSize: "2rem" }} onClick={handleIncrease}>+</Button>
          <Typography sx={{ mx: 1 }}>{cartCount}</Typography>
         <Button sx={{ fontSize: "2rem" }} onClick={handleDecrease}>-</Button> <Button onClick={()=>dispatch(removeProductFromCart(product.productId._id))}><Delete /></Button> 
          
          
        </Box>
      </TableCell>
      <TableCell align="left">
        <Typography>{updateProduct?.price || product.productId.sizesAndColors[0]?.price}</Typography>
      </TableCell>
      <TableCell align="left">
        {product?.productId?.discount ? <Typography>{product?.productId?.discount }%</Typography> : "Loading..."}
      </TableCell>
      <TableCell align="left">

        {updateProduct?.price ? <Typography>{cartCount*(updateProduct.price *  (1 - product?.productId?.discount/ 100)).toFixed(2)}</Typography> : "Loading..."}
      </TableCell>
    </TableRow>
  )
}

export default CartCard
