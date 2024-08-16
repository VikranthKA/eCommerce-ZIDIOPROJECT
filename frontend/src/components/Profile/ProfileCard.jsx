import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Chip,
  Box,
  IconButton,
  CardHeader,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue, deepPurple } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../react-redux/hooks/reduxHooks';
import { Cancel, Upload } from '@mui/icons-material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile } from '../../react-redux/slices/actions/profileActions';

const initialValues = {
  ProfilePic: null,
  gender: '',
  username: '',
  email: '',
  phoneNumber: '',
}

const ProfileCard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(initialValues);


  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,

    validationSchema: Yup.object({
      gender: Yup.string().required('Gender is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be at least 10 digits')
        .required('Phone number is required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('profilePic', values.ProfilePic);
      formData.append('gender', values.gender);
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      dispatch(updateUserProfile(formData))

    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('ProfilePic', event.currentTarget.files[0])
  };

  const {
    username,
    email,
    phoneNumber,
    role,
    isActive,
  } = profile.userId

  const { profilePic, gender, _id } = profile

  console.log(profile, "profile")

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      if (isEdit) {
        setInitialFormValues({
          username: profile.userId.username,
          email: profile.userId.email,
          phoneNumber: profile.userId.phoneNumber,

          profilePic: null,
          gender: profile.gender

        });
      }
    }
  }, [isEdit]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">

        <Card
          sx={{
            maxWidth: 345,
            margin: '20px auto',
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          {isEdit ? <> <Avatar variant="contained" component="label" sx={{ bgcolor: "#3ba1c5", width: 120, height: 120, margin: '0 auto' }}
          ><Upload />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Avatar>
            {formik.errors.ProfilePic && formik.touched.ProfilePic && (
              <Box sx={{ color: 'red', mt: 1 }}>{formik.errors.ProfilePic}</Box>
            )}</> : <Box sx={{ display: 'inline-block' }}>


            {profilePic ? <Avatar
              alt={username}
              src={profilePic}
              sx={{ width: 120, height: 120,ml:5}}
            /> : <Avatar sx={{ bgcolor: deepPurple[500], width: 120, height: 120 }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>}
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              size="small"
              >
              </IconButton>
                  </Box>}
              {!isEdit && <IconButton
                color=""
                onClick={() => setIsEdit(true)}
                sx={{ mt: { xs: 2, sm: 0,left:0 } }}
                > <EditIcon fontSize="small" /> </IconButton>
                }

          <CardContent >
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                {
                  isEdit ? <><TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  /></> : <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {username}      </Typography>
                }



                {isEdit ? <>            <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                /></> : <Typography variant="body1">
                  {phoneNumber}

                </Typography>}


                {isEdit ? <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                /> : <Typography variant="body1">
                  Email:{email}
                </Typography>}

                {isEdit ? <>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      error={formik.touched.gender && Boolean(formik.errors.gender)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.gender && formik.errors.gender && (
                    <Box sx={{ color: 'red', mt: 1 }}>{formik.errors.gender}</Box>
                  )} </> : <Typography variant="body1" >
                  Gender {gender}
                </Typography>}

                {isEdit && 
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                  
                  <Button type='submit' onClick={()=>{
                    setTimeout(()=>{setIsEdit(false)},3000)
                  }}>
                    <Chip label="success" color="success"  sx={{onClick:"color:blue"}} variant="outlined" >Submit</Chip>
                    </Button>
                  <Chip  sx={{mt:"7px"}} icon={
                  <IconButton
                    color="error"
                    onClick={() => setIsEdit(false)}
                    sx={{  }}
                  >
                    <Cancel fontSize="small" />

                  </IconButton>
                  } label="Cancel" variant="outlined" />
                </Box>}
              </Grid>


            </Grid>
          </CardContent>

        </Card>

      </form>


    </>
  );
};

export default ProfileCard;



