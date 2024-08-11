import { Box, Button, CardMedia, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import image1 from "../../Assests/image1.jpg"


const CartCard = ({ ...product }) => {
    console.log(product)
    return (
        <Container sx={{mt:10,gap:7}}>
            <Divider />
            <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
                <Typography>
                    Products
                </Typography>
                <Typography>
                    Quantity
                </Typography>  
                <Typography>
                    Price
                </Typography>        
                <Typography>
                    Total
                </Typography>

            </Box>
            <Divider/>
            <Box sx={{display:"flex",justifyContent:"space-around",mr:15}}>
            <Box sx={{display:"flex"}}>
            <CardMedia
        component="img"
        height="200"
        image={product.productId.images ? product.productId.images : image1}
        alt="Product Image"
        sx={{ objectFit: 'cover',width:200,borderRadius:2}}
      />   
      {product.productId.name}

            </Box>
        <Typography><Button>+</Button>{product.quantity.count}<Button>-</Button></Typography>    
        <Typography>{product.productId.sizesAndColors[0].price}</Typography>  
        <Typography>{product.productId.sizesAndColors[0].price*product.quantity.count}</Typography>  
        </Box>     

        </Container>
    )
}

export default CartCard