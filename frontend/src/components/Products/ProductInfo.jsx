import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../react-redux/hooks/reduxHooks'
import { Box, Button, Card, CardMedia, Container, Rating, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import image1 from "../../Assests/image1.jpg"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import CategoryIcon from '@mui/icons-material/Category';
import PercentIcon from '@mui/icons-material/Percent';
import { productEditId } from '../../react-redux/slices/actions/productActions'

const ProductInfo = () => {
    const [displayProduct, setDisplayProduct] = useState(null)
    const { productId } = useParams()
    const { products } = useAppSelector((state) => state.products)
    const {decodedData} = useAppSelector((state)=>state.user)
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState("") 
    const [selectedId, setSelectedId] = useState(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (products.length > 0) {
            const product = products.find((product) => product._id === productId)
            setDisplayProduct(product)
        }
    }, [productId, products])

    if (!displayProduct) {
        return <Typography variant="h5">Product not found</Typography>
    }

    const handleAddToCart = () => {
        console.log(quantity, selectedId)
    }

    const handleSizeAndColorChange = (e) => {
        const selectedValue = e.target.value
        setSelectedOption(selectedValue)
        const selectedProduct = displayProduct.sizesAndColors.find(sc => sc._id === selectedValue)
        setSelectedId(selectedProduct._id)
    }


    return (
        <Container sx={{ mt: 3,mb:3 }}>
            <Card>
                <Box sx={{ m: 2, display: "flex" }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={displayProduct.images ? displayProduct.images : image1}
                        alt="Product Image"
                        sx={{ objectFit: 'cover', width: "40%", borderRadius: "5px" }}
                    />
                    {/* <Container sx={{boxShadow:"3"}}> */}

                    <Box sx={{ ml: 15, width: "60%" }}>
                        <Typography variant="h5">
                            {displayProduct?.name}
                        </Typography>
                        {
                            decodedData?.role === "SuperAdmin" && <Button onClick={()=>{
                                dispatch(productEditId(displayProduct._id));
                                navigate(`/product/edit/${displayProduct._id}`)
                                
                            }}>
                                Edit
                            </Button>
                        }
                        <Typography>
                            <CategoryIcon />{displayProduct?.categoryId?.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Rating name="read-only" value={3} readOnly />
                            <Typography variant="body1" sx={{ ml: 1 }}>3 (9 reviews)</Typography>
                        </Box>
                        <Typography variant='h5' sx={{ mt: 2 }}>Price: {displayProduct.minPrice} {displayProduct.currency}</Typography>
                        <Typography variant='h6' sx={{mt:2}}>{displayProduct.discount}<PercentIcon/>Discount</Typography>
                        <Box sx={{ mt: 4 }}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Size & Color</InputLabel>
                                <Select
                                    value={selectedOption}
                                    onChange={handleSizeAndColorChange}
                                     labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Size And Color"

                                >
                                    {displayProduct.sizesAndColors.map((sc) => (
                                        <MenuItem key={sc._id} value={sc._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <span>{sc.size}</span>
                                            <span>{sc.color}</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">Quantity</Typography>
                            <Select
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{ width: 60 }}
                                
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <MenuItem key={num} value={num}>{num}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" sx={{ mr: 2 }}>Buy Now</Button>
                            <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                            <CheckCircleOutlineIcon color="success" />
                            <Typography sx={{ ml: 1 }}>Shop Secure, Free Returns</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">Share</Typography>
                            <FacebookIcon sx={{ mr: 1 }} />
                            <WhatsAppIcon sx={{ mr: 1 }} />
                            <InstagramIcon />
                        </Box>
                    
                    </Box>
                    {/* </Container> */}
                </Box>
            </Card>
        </Container>
    )
}

export default ProductInfo
