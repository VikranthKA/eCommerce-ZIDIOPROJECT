import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Card, Container, Typography, Grid, Divider, Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../react-redux/hooks/reduxHooks';
import image1 from "../../Assests/image1.jpg";
import { createUserOrder } from '../../react-redux/slices/actions/orderActions';
import CheckOutCard from './CheckOutCard';


const OrderCheckOut = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const {products} = useAppSelector(state=>state.cart.cartItems)
  const { profile } = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch()

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
dispatch(createUserOrder({selectedValue}))
    console.log("Selected Value:", {selectedValue});
  };

  const findTheSizeAndColor = (arr, id) => {
    return arr.find((sz) => sz._id === id);
  };

  const totalAmount = useCallback(() => {
    const value = products.reduce((acc, cv) => {
      const sizeAndColor = findTheSizeAndColor(cv.productId.sizesAndColors, cv.quantity.sc_id);
      const priceAfterDiscount = sizeAndColor.price * (1 - cv?.productId?.discount / 100);
      return acc + (cv.quantity.count * priceAfterDiscount);
    }, 0);
    return value.toFixed(2);
  }, [products]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <CheckOutCard product={product} index={index}/>
 
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
            Total: ₹{totalAmount()}
          </Typography>
        </Box>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">
            <Typography variant='h6' sx={{ color: "black", fontWeight: 'bold' }}>
              Select an Address
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-label="addresses"
            name="addresses"
            value={selectedValue}
            onChange={handleChange}
          >
            {profile?.addresses?.map((address, index) => (
              <FormControlLabel
                key={index}
                value={address._id}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{address.title}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">{`${address?.building}, ${address?.locality}, ${address?.city}, ${address?.state} - ${address?.pincode}`}</Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ px: 4, py: 1.5 }}>
            Place Order
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default OrderCheckOut;
