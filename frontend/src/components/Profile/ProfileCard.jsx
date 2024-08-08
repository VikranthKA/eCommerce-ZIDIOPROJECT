import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Grid,
  Chip,
  CardMedia,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { deepPurple } from '@mui/material/colors';
import { useAppSelector } from '../../react-redux/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const [isEdit,setIsEdit] = useState(false)
  const profile = useAppSelector((state)=>state.profile.profile.userId)

  const {
    username,
    email,
    phoneNumber,
    role,
    isActive,
    createdAt,
    updatedAt,
  } = profile;


  const navigate = useNavigate()
  return (
    <>

<Card
      sx={{
        width: '60%',
        margin: '20px auto',
        background: 'linear-gradient(135deg, #f0f0f0 30%, #e0e0e0 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="h6">{username}</Typography>}
        subheader={role}
      />
      <div style={{display:"flex",flexDirection:"row",flexGrow:"inherit",gap:"10px"}}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Phone:</strong> {phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Account Created:</strong> {new Date(createdAt).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box style={{ }}>
        <IconButton color="primary" onClick={()=>setIsEdit(!isEdit)}>
        Edit  <EditIcon />
        </IconButton>

      </Box>
      </div>
    </Card>

    {
      isEdit && <>
    I am Form
      </>
    }
    </>
  );
};

export default ProfileCard;

