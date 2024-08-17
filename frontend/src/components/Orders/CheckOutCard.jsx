import React from 'react'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Card, Container, Typography, Grid, Divider, Box } from '@mui/material';

import image1 from "../../Assests/image1.jpg";

const CheckOutCard = ({product,index}) => {
    const findTheSizeAndColor = (arr, id) => {
        return arr.find((sz) => sz._id === id);
      };
  return (
    <div>
                    <Grid item xs={12} key={product?.productId?._id}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={product?.productId?.images ? product?.productId?.images : image1} // Replace with actual product image URL
                  alt={product?.productId?.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 4 }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{product?.productId?.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {product?.quantity?.count}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Size: {findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.size}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Color: {findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.color}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₹{(findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.price * (1 - product?.productId?.discount / 100)).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
    </div>
  )
}

export default CheckOutCard