import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddressForm = () => {
    const [initialValues, setInitialValues] = useState({
        title: '',
        address: {
            building: '',
            locality: '',
            city: '',
            state: '',
            pincode: '',
            country: ''
        }
    });

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            address: Yup.object({
                building: Yup.string().required('Required'),
                locality: Yup.string().required('Required'),
                city: Yup.string().required('Required'),
                state: Yup.string().required('Required'),
                pincode: Yup.string().matches(/^\d{6}$/, 'Must be exactly 6 digits').required('Required'),
                country: Yup.string().required('Required'),
            }),
        }),
        onSubmit: (values) => {
            console.log('Form data', values);
            // Update the state or send data to an API
            setInitialValues({
                title: 'Home',
                address: {
                    building: '',
                    locality: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: ''
                }
            });
        },
    });

    return (
        <>
        <form onSubmit={formik.handleSubmit} style={{ margin: "20px 100px 0px 100px" }}>
        <Grid item xs={12} sm={6}>
            <Box sx={{display:"flex",justifyContent:"center"}}>

        <Typography variant='h3' >Add Address</Typography>
            </Box>
</Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginLeft: 10, marginRight: 10 }}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.building"
                        name="address.building"
                        label="Building"
                        value={formik.values.address.building}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.building && Boolean(formik.errors.address?.building)}
                        helperText={formik.touched.address?.building && formik.errors.address?.building}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.locality"
                        name="address.locality"
                        label="Locality"
                        value={formik.values.address.locality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.locality && Boolean(formik.errors.address?.locality)}
                        helperText={formik.touched.address?.locality && formik.errors.address?.locality}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.city"
                        name="address.city"
                        label="City"
                        value={formik.values.address.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                        helperText={formik.touched.address?.city && formik.errors.address?.city}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.state"
                        name="address.state"
                        label="State"
                        value={formik.values.address.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.state && Boolean(formik.errors.address?.state)}
                        helperText={formik.touched.address?.state && formik.errors.address?.state}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.pincode"
                        name="address.pincode"
                        label="Pincode"
                        value={formik.values.address.pincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.pincode && Boolean(formik.errors.address?.pincode)}
                        helperText={formik.touched.address?.pincode && formik.errors.address?.pincode}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="address.country"
                        name="address.country"
                        label="Country"
                        value={formik.values.address.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                        helperText={formik.touched.address?.country && formik.errors.address?.country}
                    />
                </Grid>

                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={3}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Add Address        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </form>
        </>
    );
};

export default AddressForm
