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
import { fetchAllUsersForAdmin } from '../../../react-redux/slices/actions/adminActions';
import Profile from './../../../pages/Profile/Profile';


export default function Deactivate() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.admin.allUser);
    const [filterdProfile, setFilterdProfile] = useState([])

    useEffect(() => {
        dispatch(fetchAllUsersForAdmin())
    }, []);

    const handleSearch = (search) => {

        const users = profiles.filter((profile) => {
            console.log(profile.userId.username, search, "name")
            return profile.userId?.username?.toLowerCase().includes(search.toLowerCase())
        })

        setFilterdProfile(users)
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ borderBottom: '3px solid black', pb: 1 }}>
                Profile List
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
                    <Button fullWidth onClick={() => handleSearch(search)} variant="contained" color="primary" sx={{ height: '100%' }}>
                        Search
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {profiles?.length > 0 ? (

                    (filterdProfile.length > 0 ? filterdProfile : profiles).map((profile) => (
                        <Grid item key={profile._id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h4">
                                        {profile?.userId?.username}
                                    </Typography>

                                    {profile?.profilePic ? (
                                        <CardMedia
                                            component="img"
                                            image={`${profile.profilePic}`}
                                            alt="Profile"
                                            sx={{ width: 90, height: 90, objectFit: 'cover', mt: 1, mb: 1 }}
                                        />
                                    ) : (
                                        <Typography
                                            sx={{ width: 90, height: 90, objectFit: 'cover', mt: 1, mb: 1, bgcolor: "grey" }}

                                        >No Image</Typography>
                                        // <FontAwesomeIcon icon={faUserAstronaut} size="3x" style={{ margin: '16px 0' }} />
                                    )}

                                    <Typography variant="body2">Email: {profile.userId?.email}</Typography>
                                    <Typography variant="body2">Role: {profile.userId?.role}</Typography>
                                    <Typography variant="body2">Address: {profile?.addresses[0]?.city ? profile?.addresses[0]?.city : "N/A"}</Typography>


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
