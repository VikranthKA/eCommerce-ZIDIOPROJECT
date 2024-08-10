import React, { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Container, Typography, Collapse, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '../../Products/ProductCard';

function OrderCard({ ...order }) {
    const [expanded, setExpanded] = useState(false);

      const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 console.log(order[0].ordersId,"order")
 


  return (
    <Container sx={{ mt: 2, boxShadow: 2, width: '100%', height: 'auto', p: 2, borderRadius: '6px' }} key={order?.ordersId?._id}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' ,mt:1}}>
        <Typography>Total Amount: {order[0]?.ordersId?.totalAmount}</Typography>
        <Typography>Currency: {order[0]?.ordersId?.currency}</Typography>
        <Typography>
          Status {order[0]?.ordersId?.paymentStatus ? <h3>Completed</h3> : <Button >Complete Payment</Button>}
        </Typography>
        <Typography>Ordered At: {new Date(order[0]?.ordersId?.createdAt).toLocaleString()}</Typography>
        <ExpandMore
          expand={expanded ? 1 : 0}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Products:</Typography>
          {order[0]?.ordersId?.products?.map((product) => (
            <ProductCard key={product?.productId._id} {...product?.productId} />
          ))}
        </CardContent>
      </Collapse>
    </Container>
  );
}

export default OrderCard;
