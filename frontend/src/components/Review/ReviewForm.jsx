import React, { useState } from 'react';
import { Button, TextField, Typography, Rating, Grid, IconButton, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/system';
import { useAppDispatch } from '../../react-redux/hooks/reduxHooks';
import { createReviewForProductAction } from '../../react-redux/slices/actions/reviewsActions';

const Input = styled('input')({
  display: 'none',
});

const ReviewForm = ({ productId }) => {
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(0)
  const [images, setImages] = useState([])

  const dispatch = useAppDispatch()

  const handleBodyChange = (event) => {
    setBody(event.target.value)
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating)
  };

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files)
    if (images.length + uploadedImages.length <= 3) {
      setImages([...images, ...uploadedImages])
    } else {
      alert('You can upload a maximum of 3 images.')
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('body', body)
    formData.append('rating', rating)

    images.forEach((image)=>formData.append('images', image))

    

    console.log(...images,"images")

    dispatch(createReviewForProductAction(formData, productId))

    // Clear the form fields after submission
    setBody('');
    setRating(0);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <Typography variant="h6">Leave a Review</Typography>

      <TextField
        label="Review"
        value={body}
        onChange={handleBodyChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
      />

      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={handleRatingChange}
      />

  <Box sx={{}}>
      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <div style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`upload-${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <IconButton
                  aria-label="remove image"
                  size="small"
                  style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'white' }}
                  onClick={() => handleImageRemove(index)}
                >
                  X
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        <Box>

        {images.length < 3 && (
          <label htmlFor="icon-button-file">
            <Input
              accept="images/*"
              id="icon-button-file"
              type="file"
              multiple
              onChange={handleImageUpload}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        )}
        </Box>

      </div>
<div style={{}}>
      <Button type="submit" variant="contained" color="primary" style={{  }}>
        Submit Review
      </Button>
      </div>
  </Box>
    </form>
  );
};

export default ReviewForm
