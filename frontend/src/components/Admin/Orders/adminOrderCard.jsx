import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  CardMedia,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchUpdateDeliveryStatus } from '../../../react-redux/slices/actions/adminActions';

const statusOptions = ['PENDING', 'SHIPPING', 'INPROGRESS', 'DELIVERED', 'CANCELLED'];

const AdminOrderCard = ({ _id, userId, products, totalAmount, deliveryStatus, createdAt }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(deliveryStatus);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    console.log(newStatus,"S")
    dispatch(fetchUpdateDeliveryStatus({ orderId: _id, deliveryStatus: newStatus }));
  };

  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order ID: {_id}
        </Typography>
        <Typography variant="body1">
          Customer: {userId?.username} ({userId?.email})
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ordered on: {new Date(createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Total Amount: ₹{totalAmount}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Delivery Status</InputLabel>
            <Select value={status} label="Delivery Status" onChange={handleChange}>
              {statusOptions.map((statusValue) => (
                <MenuItem key={statusValue} value={statusValue}>
                  {statusValue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Products:</Typography>
          {products.map((product, index) => (
            <Box key={index} sx={{ ml: 2, my: 1 }}>
              <Typography variant="body2">
                Product ID: {product.productId._id}
              </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      image={product?.productId?.images ? product?.productId?.images : "image"}
                      alt="Product Image"
                      sx={{ objectFit: 'cover',}}
                    />
              <Typography variant="body2">
                Quantity: {product.quantity?.count ?? 'N/A'}
              </Typography>
              <Typography variant="body2">
                Real Model: {product.isRealModelIncluded ? 'Yes' : 'No'}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminOrderCard;
