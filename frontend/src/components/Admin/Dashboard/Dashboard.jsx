import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {ListItemIcon} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';



import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateProduct from '../Products/CreateProduct';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  menu: {
    width: 250,
    borderRight: '1px solid #ccc',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
});

export default function PersistentDrawer() {
  const classes = useStyles();
  const [content, setContent] = useState(<CreateProduct/>);

  const handleMenuClick = (text) => {
    setContent(text);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.menu}>
        <List>
          {['New Product', 'Coupon', 'Payment','New Category'].map((text, index) => (
            <ListItem  key={text} onClick={() => handleMenuClick(text)}>
              <ListItemIcon>{}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Products', 'Users', 'Coupons',"Orders"].map((text, index) => (
            <ListItem  key={text} onClick={() => handleMenuClick(text)}>
              <ListItemIcon>{}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classes.content}>
        <Typography variant="h4">{content}</Typography>
        <Typography variant="body1">
          {content === 'New Product' && <CreateProduct/>}
          {content === 'Coupon' && 'Here are your Coupon items.'}
          {content === 'Payment' && 'Here you can Payment.'}
          {content === 'New Category' && 'Here can create Category.'}
          {content === 'Products' && 'Here is all your Products.'}
          {content === 'Users' && 'Here is your Users.'}
          {content === 'Coupons' && 'Here is your Coupons.'}
          {content === 'Orders' && 'These are your Users Orders'}
        </Typography>
      </Box>
    </Box>
  );
}
