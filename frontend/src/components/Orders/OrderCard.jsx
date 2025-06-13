import React, { useEffect, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Container, Typography, Collapse, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckOutCard from './CheckOutCard';
import { useAppDispatch } from '../../react-redux/hooks/reduxHooks';
import { startPayment } from '../../react-redux/slices/actions/paymentAction';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useSelector } from 'react-redux';



function OrderCard({ ...order }) {
  const [expanded, setExpanded] = useState(false);
  const card = "card"
  const dispatch = useAppDispatch()

  const reduxState = useSelector(state=>state)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePayment = (orderId) => {
    console.log("payment");
    dispatch(startPayment(orderId, { card }));
  }

  useEffect(()=>{

  })

  return (
    <Container sx={{ mt: 2, boxShadow: 2, width: '100%', height: 'auto', p: 2, borderRadius: '6px' }} key={order?.ordersId?._id}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', mt: 1 }}>
        <Typography>Total Amount: {order?.ordersId?.totalAmount}</Typography>
        <Typography>Currency: {order?.ordersId?.currency}</Typography><br />
        <Typography>
          Status {order?.ordersId?.paymentStatus ? <CreditScoreIcon /> : <Button onClick={() => handlePayment(order?.ordersId?._id)}>Complete Payment</Button>}
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
          <Box>
            {order?.ordersId?.products?.map((product) => (
              <CheckOutCard product={product} />
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Container>
  );
}

export default OrderCard;
