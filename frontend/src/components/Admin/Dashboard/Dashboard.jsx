import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateProduct from '../Products/CreateProduct';
import CreateCategory from "../Category/CreateCategory";
import AllCategory from "../Category/AllCategory";
import Analytics from './Analytics';
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
  activeItem: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    borderLeft: '4px solid lightblue', // Add border color and width
    paddingLeft: '16px', // Ensure there's space for the border
  },
});

export default function PersistentDrawer() {
  const classes = useStyles();
  const [activeMenuItem, setActiveMenuItem] = useState(false);
  
  const handleMenuClick = (text) => {
    setActiveMenuItem(text);
  };

  const handleCategoryView = () => (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
      <div style={{ display: "flex", justifyContent: "center" }}><CreateCategory /></div>
      <div><AllCategory /></div>
    </div>
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.menu}>
        <List>
          {['New Product', 'Coupon', 'Payment', 'Category'].map((text) => (
            <ListItem
              key={text}
              button
              onClick={() => handleMenuClick(text)}
              className={activeMenuItem === text ? classes.activeItem : ''}
            >
              <ListItemIcon>{/* Add icons here */}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Products', 'Users', 'Coupons', "Orders"].map((text) => (
            <ListItem
              key={text}
              button
              onClick={() => handleMenuClick(text)}
              className={activeMenuItem === text ? classes.activeItem : ''}
            >
              <ListItemIcon>{/* Add icons here*/}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classes.content}>
        <Typography variant="body1">
          {activeMenuItem ? <>
          {activeMenuItem === 'New Product' && <CreateProduct />}
          {activeMenuItem === 'Coupon' && 'Here are your Coupon items.'}
          {activeMenuItem === 'Payment' && 'Here you can make Payments.'}
          {activeMenuItem === 'Category' && handleCategoryView()}
          {activeMenuItem === 'Products' && 'Here are all your Products.'}
          {activeMenuItem === 'Users' && 'Here are your Users.'}
          {activeMenuItem === 'Coupons' && 'Here are your Coupons.'}
          {activeMenuItem === 'Orders' && 'These are your Orders.'}
          </> : <Analytics/> }
        </Typography>
      </Box>
    </Box>
  );
}
