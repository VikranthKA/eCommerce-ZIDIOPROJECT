
import { Box, Grid, Typography, Container, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import React from 'react';
import image1 from '../Assests/image1.jpg';
import image2 from '../Assests/image2.jpg';
import UVP from '../components/UniqueValueProposition/UVP';
// import landingPageImage from '/mnt/data/landingPage.jpg'; // Ensure this path is correct
import './CSS/Home.css';
import ProductCard from "../components/Products/ProductCard"
import {useAppDispatch,useAppSelector} from "../react-redux/hooks/reduxHooks"
import { decrement, increment } from '../react-redux/slices/actions/countActions';

const Home = () => {
  
  const uvpData = {
    title: 'Our Unique Value Proposition',
    description: 'We offer the best products at the best prices, delivered directly to your doorstep.',
    // imageUrl: landingPageImage
  };
  const count = useAppSelector(state=>state.count.value)
  const dispatch = useAppDispatch()

  return (
    <div >
      <AppBar position="static">
        <Toolbar sx={{ flexGrow: 1, bgcolor: 'electricblue',minHeight:"30px"}}>
          <Typography variant="h6" >
            eCommerce Site
          </Typography>
          <Box sx={{ flexGrow: 1, bgcolor: 'lightblue' }} />
          <Button color="inherit">Men</Button>
          <Button color="inherit">Women</Button>
          <Button color="inherit">Kids</Button>
          <Button color="inherit">New Brands</Button>
          <Button color="inherit">Discounts</Button>
        </Toolbar>
      </AppBar>

      </div>
  );
};

export default Home;















































































































































































































































































































      {/* <Container>
        <Box sx={{ bgcolor: 'lightblue', padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={image1} alt="Example 1" style={{ height: '250px', width: '40%' }} />
                <img src={image2} alt="Example 2" style={{ height: '250px', width: '20%' }} />
                <UVP title={uvpData.title} description={uvpData.description} imageUrl={uvpData.imageUrl} />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
              <Box className="box1">Free Shipping & Returns</Box>
              <Box className="box2">Loyalty Program</Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Featured Products</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
               
                                <ProductCard/>
                                <ProductCard/>
                                <ProductCard/>

              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Recommended for You</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>

                {/* <Box className="product-card">Product Name - $22.00</Box>
                <Box className="product-card">Product Name - $22.00</Box>
                <Box className="product-card">Product Name - $22.00</Box> */}
                {/* <ProductCard/>
                <ProductCard/>
                <ProductCard/>

              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'darkgrey', padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6">About Us</Typography>
            <Box>Item One</Box>
            <Box>Item Two</Box>
            <Box>Item Three</Box>
            <Box>Item Four</Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Customer Care</Typography>
            <Box>Item One</Box>
            <Box>Item Two</Box>
            <Box>Item Three</Box>
            <Box>Item Four</Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Contact Us</Typography>
            <Box>Item One</Box>
            <Box>Item Two</Box>
            <Box>Item Three</Box>
            <Box>Item Four</Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Newsletter Signup</Typography>
            <Box>
              <input type="email" placeholder="Your email" />
              <Button variant="contained" color="primary">Subscribe</Button>
            </Box>
          </Grid>
        </Grid>
      </Box> */} 

