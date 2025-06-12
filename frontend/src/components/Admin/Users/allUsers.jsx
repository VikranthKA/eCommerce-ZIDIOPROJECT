import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
// import axios from './../../../Utils/api_resources/axios';

export default function Deactivate() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.allProfile);

  useEffect(() => {
    // dispatch(startGetProfile(search));
  }, [search]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ borderBottom: '3px solid black', pb: 1 }}>
        Static Profile List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Search by username"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" color="primary" sx={{ height: '100%' }}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Grid item key={profile._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Username: {profile.userId?.username}
                  </Typography>

                  {profile?.profilePic ? (
                    <CardMedia
                      component="img"
                      image={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                      alt="Profile"
                      sx={{ width: 90, height: 90, objectFit: 'cover', mt: 1, mb: 1 }}
                    />
                  ) : (
                    <Button>Add Icon</Button>
                    // <FontAwesomeIcon icon={faUserAstronaut} size="3x" style={{ margin: '16px 0' }} />
                  )}

                  <Typography variant="body2">Email: {profile.userId?.email}</Typography>
                  <Typography variant="body2">Role: {profile.userId?.role}</Typography>
                  <Typography variant="body2">Address: {profile.addressInfo?.address}</Typography>

                  <Button
                    variant="contained"
                    color={profile.userId?.isActive ? 'error' : 'success'}
                    sx={{ mt: 2 }}
                    // onClick={() => handleToggleActivation(profile.userId._id, profile.userId.isActive)}
                  >
                    {profile.userId?.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No User Found</Typography>
        )}
      </Grid>

      <ToastContainer />
    </Container>
  );
}
