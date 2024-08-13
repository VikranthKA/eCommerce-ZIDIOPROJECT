import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, TableCell, TableRow, Typography } from '@mui/material';
import image1 from "../../Assests/image1.jpg";

function findTheSizeAndColor(arr,id){
  const result = arr.find((sz)=>(
    sz._id===id
  ))
  return result
}

const CartCard = ({ ...product }) => {
  const [updateProduct,setUpdateProduct] = useState({

  })

  useEffect(()=>{
    setUpdateProduct(findTheSizeAndColor(product.productId.sizesAndColors,product.quantity.sc_id))

  },[product.productId,product.quantity])

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            height="100"
            image={product.productId.images ? product.productId.images : image1}
            alt="Product Image"
            sx={{ objectFit: 'cover', width: 100, borderRadius: 2, marginRight: 2 }}
          />
          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
          <Typography variant="body1">{product.productId.name}</Typography>
          <Typography>SIZE:{updateProduct?.size}</Typography>
          <Typography>COLOR:{updateProduct?.color}</Typography>

          </Box>

        </Box>
      </TableCell>
      <TableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center",mr:0 }}>
          <Button sx={{}}>+</Button>
          <Typography sx={{  }}>{product.quantity.count}</Typography>
          <Button>-</Button>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Typography>{product.productId.sizesAndColors[0].price}</Typography>
      </TableCell>
      <TableCell align="left">
{  updateProduct?.price ?  <Typography>{updateProduct?.price* product.quantity.count}</Typography> : "Loading..."
}      </TableCell>
    </TableRow>
  );
};

export default CartCard;