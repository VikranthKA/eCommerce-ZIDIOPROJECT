import React from 'react';
import { Card, CardMedia, CardContent, CardActions, IconButton, Typography, Chip, Collapse, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import image1 from "../../Assests/image1.jpg";
import { Link } from 'react-router-dom';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ ...product }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width:"250px",maxWidth: 250, margin: 'auto', mt: 5,boxShadow: 3 ,height:350}} key={product._id}>
      <Link to={`/product/${product._id}`}  style={{ textDecoration: 'none'}}>
      <CardMedia
        component="img"
        height="194"
        image={product?.images ? product?.images : image1}
        alt="Product Image"
        sx={{ objectFit: 'cover',}}
      />
      <CardContent>
        <Container>
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',gap:1 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product?.name}</Typography>
          <Typography variant="h6" color="text.primary" gutterBottom sx={{ margin: '0px' }}>
            <Chip label={product?.categoryId?.name} color="primary" />
          </Typography>
        </Box>
      { product?.sizesAndColors?.length &&     
       <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            {console.log(product?.sizesAndColors[0]?.price)}
            ₹{product?.sizesAndColors[0]?.price}
          </Typography>
          <Typography variant="h5" color="success.main">
            ₹{(product?.sizesAndColors[0].price * (1 - product?.discount / 100)).toFixed(2)}
          </Typography>

        </Box>}
        </Container>
      </CardContent>
      <CardActions disableSpacing sx={{ m: 0 }}>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Additional Details:</Typography>
          <Typography paragraph>
            {product?.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Link>
    </Card>
  );
};

export default ProductCard;
