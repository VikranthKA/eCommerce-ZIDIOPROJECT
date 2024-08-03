import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, InputLabel, FormHelperText, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch, useAppSelector } from '../../../react-redux/hooks/reduxHooks';
import { removeCategoryIdForEdit } from '../../../react-redux/slices/actions/categoryActions';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState(null);
  const [errors, setErrors] = useState({ name: '', images: '' });
  

  const {categories} = useAppSelector((state=>state))

  useEffect(()=>{
    const categoryData = categories.category.find((cat=>cat._id===categories.editId))
    if(categoryData?._id){
      setName(categoryData.name)
      

    }

  },[categories.editId])
  

  const validate = () => {
    let tempErrors = { name: '', images: '' };
    if (!name) tempErrors.name = 'Name is required';
    if (!images) tempErrors.images = 'Image is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('images', images);

      // You can now send formData to your backend
      console.log([...formData]); // For demonstration purposes

      try {
          setName("")
          setImages(null)
      } catch (error) {
        console.log(error)
        
      }
    }
  };

  const dispatch = useAppDispatch()
  return (
    <form onSubmit={handleSubmit} style={{ width: '80%',marginLeft:"42px" }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-around',
          boxShadow: 3,
          alignItems: 'center',
          mx: 'auto',
          mt: 5,
          borderRadius: '5px',
          p: 3,
          maxWidth: '900px',
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{ mb: 3, mt: { xs: 2, md: 4 }, width: { xs: '90%', md: '30%' } }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3, mt: { xs: 2, md: 4 }, width: { xs: '90%', md: '30%' } }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={(event) => {
              setImages(event.currentTarget.files[0]);
            }}
          />
          <label htmlFor="raised-button-file" style={{ marginTop: '6px' }}>
            <Button
              variant="contained"
              color={errors.images ? 'error' : images ? 'success' : 'primary'}
              component="span"
              startIcon={<CloudUploadIcon />}
              style={{ margin: '8px', marginBottom: '21px' }}
            >
              Upload
            </Button>
          </label>
          {errors.images && (
            <FormHelperText error sx={{ ml: 1 }}>
              {errors.images}
            </FormHelperText>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ height: '45px', mb: 3, mt: { xs: 2, md: 4 }, width: { xs: '90%', md: '10%' } }}>
          Submit
        </Button>
        {
          categories.editId && 
            <Button type="cancel" variant="cantained" onClick={()=>{
              setName("");
              setImages(null);
              dispatch(removeCategoryIdForEdit());
            }} color="error" sx={{ height: '45px', mb: 3, mt: { xs: 2, md: 4 }, width: { xs: '90%', md: '10%' } }}>
            Cancel
          </Button>
          
        }
      </Container>
    </form>
  );
};

export default CreateCategory;
