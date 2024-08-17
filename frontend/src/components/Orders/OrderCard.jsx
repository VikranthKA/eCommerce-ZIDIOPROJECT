import React, { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Container, Typography, Collapse, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '../Products/ProductCard';
import CheckOutCard from './CheckOutCard';


 
function OrderCard({ ...order }) {
    const [expanded, setExpanded] = useState(false);

      const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{ mt: 2, boxShadow: 2, width: '100%', height: 'auto', p: 2, borderRadius: '6px' }} key={order?.ordersId?._id}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' ,mt:1}}>
        <Typography>Total Amount: {order?.ordersId?.totalAmount}</Typography>
        <Typography>Currency: {order?.ordersId?.currency}</Typography><br/>
        <Typography>
          Status {order?.ordersId?.paymentStatus ? <h3>Completed</h3> : <Button >Complete Payment</Button>}
        </Typography>
        <Typography>Ordered At: {new Date(order?.ordersId?.createdAt).toLocaleString()}</Typography>
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
          {order?.ordersId?.products?.map((product) => (
            <CheckOutCard product={product} />
          ))}
        </CardContent>
      </Collapse>
    </Container>
  );
}

export default OrderCard;
