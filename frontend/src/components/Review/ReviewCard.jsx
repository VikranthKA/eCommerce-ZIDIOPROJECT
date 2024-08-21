import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Avatar, Box, Card, CardMedia, Container, Rating, Typography, Button, TextField, Grid, IconButton, Input } from '@mui/material';import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../react-redux/hooks/reduxHooks";
import { deepPurple, grey, yellow } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import Delete from '@mui/icons-material/Delete';

import { deleteReviewForProductAction, updateReviewForProductAction } from "../../react-redux/slices/actions/reviewsActions";




const ReviewCard = ({ ...review }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [body, setBody] = useState(review?.reviewId?.body || '');
    const [rating, setRating] = useState(review?.reviewId?.rating || 0);
    const user = useAppSelector(state=>state?.user?.decodedData?.id)
    // const [images, setImages] = useState(review?.reviewId?.images || []);
    // console.log(review,"review")

    const dispatch = useAppDispatch();

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };

    // const handleImageUpload = (event) => {
    //     const uploadedImages = Array.from(event.target.files);
    //     if (images.length + uploadedImages.length <= 3) {
    //         setImages([...images, ...uploadedImages]);
    //     } else {
    //         alert('You can upload a maximum of 3 images.');
    //     }
    // };

    // const handleImageRemove = (index) => {
    //     const updatedImages = images.filter((_, i) => i !== index);
    //     setImages(updatedImages);
    // };

    const handleEditClick = () => {
        setIsEdit(!isEdit);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({body,rating},"updatedBody")

        dispatch(updateReviewForProductAction({body,rating},review.reviewId.productId,review.reviewId._id))

        // images.forEach((image) => formData.append('images', image));


        // dispatch(createReviewForProductAction(formData, productId));

        // Clear the form fields after submission
        setIsEdit(false)
        setBody('');
        setRating(0);
        // setImages([]);
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <Container sx={{ my: 3, width: "500px" }}>
                    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            {review?.reviewId?.profileId?.profilePic ? (
                                <Avatar
                                    alt={review?.reviewId?.profileId?.userId?.username}
                                    src={review?.reviewId?.profileId?.profilePic}
                                    sx={{ width: 50, height: 50, mr: 2 }}
                                />
                            ) : (
                                <Avatar sx={{ bgcolor: deepPurple[500], width: 50, height: 50, mr: 2 }}>
                                    {review?.reviewId?.profileId?.userId?.username?.charAt(0)?.toUpperCase()}
                                </Avatar>
                            )}
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>
                                {review?.reviewId?.profileId?.userId?.username}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2, ml: 3 }}>
                            {isEdit ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <Typography variant="body1" sx={{ mb: 1, color: grey[700] }}>
                                        {review?.reviewId?.body}

                                        {
                                            (user===review?.reviewId?.profileId?.userId?._id) && <>
                                            <EditIcon sx={{ mb: 1, cursor: 'pointer' }} onClick={handleEditClick} />
                                            <Delete sx={{ mb: 1, cursor: 'pointer' }}  onClick={()=>dispatch(deleteReviewForProductAction(review.reviewId.productId,review.reviewId._id))}/>
                                            </>
                                     
                                            
                                            
                                        }

                                    </Typography>
                                    <Rating value={review?.reviewId?.rating} readOnly sx={{ color: yellow }} />
                                </>
                            )}
                        </Box>

                        {isEdit ? (
                            <>
                                {/* <Box>
                                    <Grid container spacing={2}>
                                    {images.map((image, index) => (
    <Grid item key={index}>
        <div style={{ position: 'relative' }}>
            {image instanceof File && (
                <img
                    src={URL.createObjectURL(image)}
                    alt={`upload-${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
            )}
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
                                    {images.length < 3 && (
                                        <label htmlFor="icon-button-file">
                                            <Input
                                                accept="image/*"
                                                id="icon-button-file"
                                                type="file"
                                                multiple
                                                onChange={handleImageUpload}
                                                sx={{display:"none"}}
                                            />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    )}
                                </Box> */}
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit Review
                                    </Button>
                                    <Button variant="text" onClick={handleEditClick} sx={{ ml: 2 }}>
                                        Cancel
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            review?.reviewId?.images?.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                                    {review?.reviewId?.images.map((image, index) => (
                                        <CardMedia
                                            key={index}
                                            component="img"
                                            height="100"
                                            image={image}
                                            alt="review-image"
                                            sx={{ objectFit: 'cover', width: 100, borderRadius: 2, boxShadow: 1 }}
                                        />
                                    ))}
                                </Box>
                            )
                        )}
                    </Card>
                </Container>
            </form>
        </>
    );
};

export default ReviewCard;
