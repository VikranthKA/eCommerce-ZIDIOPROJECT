import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../react-redux/hooks/reduxHooks"
import { addNewAddressForUserProfile, updateTheUserProfileAddress } from '../../../react-redux/slices/actions/profileActions';

const AddressForm = ({ address, isEdit,setIsEdit }) => {
    const {profile} = useAppSelector(state=>state.profile)
    const [initialValues, setInitialValues] = useState({
        address: {
            title: '',
            building: '',
            locality: '',
            city: '',
            state: '',
            pincode: '',
            country: ''
        }
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (Object.keys(profile?.addresses
        )?.length > 0) {
            setInitialValues({
                address: {
                    title: address?.title,
                    building: address?.building,
                    locality: address?.locality,
                    city: address?.city,
                    state: address?.state,
                    pincode: address?.pincode,
                    country: address?.country
                }
            })
        }
    }, [isEdit,address])


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            address: Yup.object({
                title: Yup.string().required('Required'),
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
            if(address?._id){
                dispatch(updateTheUserProfileAddress(values,address._id))
                setIsEdit(false)
            }else{
                dispatch(addNewAddressForUserProfile(values))

            }
            setInitialValues({
                address: {
                    title: '',
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>

                        <Typography variant='h3' >Add Address</Typography>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginLeft: 10, marginRight: 10 }}>
                        <TextField
                            fullWidth
                            id="address.title"
                            name="address.title"
                            label="Title"
                            value={formik.values.address.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address?.title && Boolean(formik.errors.address?.title)}
                            helperText={formik.touched.address?.title && formik.errors.address?.title}
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
                        <Grid item xs={3} sx={{display:"flex",justifyContent:"space-between"}}>
                            <Button color="primary" variant="contained"  type="submit" >
                                Add Address
                            </Button>
                            {
                                isEdit && <Button onClick={()=>setIsEdit(false)}>
                                    Cancel
                                </Button>
                            }
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </>
    );
};

export default AddressForm
