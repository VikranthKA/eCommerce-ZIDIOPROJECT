// import React, { useEffect } from 'react';
// import { useFormik, FieldArray, FormikProvider } from 'formik';
// import * as Yup from 'yup';
// import { Button, TextField, Box, Typography, IconButton, Grid, Container, InputLabel, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
// import { AddCircle, RemoveCircle } from '@mui/icons-material';
// import axios from '../../../Utils/api_resources/axios';
// import { Toaster, toast } from 'react-hot-toast';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { useAppDispatch, useAppSelector } from '../../../react-redux/hooks/reduxHooks';
// import { createNewProduct, updateProductSaga } from '../../../react-redux/slices/actions/productActions';
// import { useParams } from 'react-router-dom';


// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   description: Yup.string().required('Description is required'),
//   minPrice: Yup.number().min(0, 'Minimum price cannot be negative').required('Minimum price is required'),
//   currency: Yup.string().required('Currency is required'),
//   totalStock: Yup.number().min(0, 'Total stock cannot be negative').required('Total stock is required'),
//   categoryId:Yup.string().required("Select a Category"),
//   sizesAndColors: Yup.array()
//     .of(
//       Yup.object({
//         size: Yup.string().required('Size is required'),
//         color: Yup.string().required('Color is required'),
//         price: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
//         stock: Yup.number().min(0, 'Stock cannot be negative').required('Stock is required'),
//       })
//     )
//     .min(1, 'At least one size and color combination is required'),
//   discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100'),
//   productType: Yup.string().required('Product type is required'),
//   madeFrom: Yup.string().required('Material is required'),
//   images: Yup.mixed().required('Image is required'),
// });

// const initialValues = {
//   name: '',
//   description: '',
//   minPrice: 0,
//   currency: 'INR',
//   categoryId:"",
//   totalStock: 0,
//   sizesAndColors: [{ size: '', color: '', price: 0, stock: 0 }],
//   discount: 0,
//   productType: '3DModelWithLogo',
//   madeFrom: 'Plastic',
//   images: null,
// };

// const productTypes = [
//   '3DModelWithLogo',
//   '3DModelWithoutLogo',
//   '3DSoftwareWithLogo',
//   '3DSoftwareWithoutLogo',
//   '3DModelWithLogo & 3DSoftwareWithLogo',
//   '3DModelWithLogo & 3DSoftwareWithoutLogo',
//   '3DModelWithoutLogo & 3DSoftwareWithLogo',
//   '3DModelWithoutLogo & 3DSoftwareWithoutLogo'
// ];


// const ProductForm = () => {
//   const categories = useAppSelector((state)=>state.categories.category)
//   const {products} = useAppSelector((state)=>state)
//   const productId = useParams()
//   const dispatch = useAppDispatch()


//   useEffect(()=>{
//     if(productId && products.products.length > 0){
//       console.log(products.products,productId)
//       const editProduct = products?.products?.find((product)=>console.log(product?._id)===console.log(productId))
//       console.log(editProduct,"foin")
//     }
//   },[productId])
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         Object.keys(values).forEach((key) => {
//           if (key === 'sizesAndColors') {
//             formData.append(key, JSON.stringify(values[key]));
//           } else if (key === 'images') {
//             formData.append(key, values[key])
//           } else {
//             formData.append(key, values[key])
//           }
//         })
//         console.log(...formData)

//         if(productId){
//           dispatch(updateProductSaga(formData,productId))
//         }else{
//           dispatch(createNewProduct(formData))
//         }


        
        
//         toast.success('Product created successfully')
//       } catch (error) {
//         toast.error('Error creating product');
//         console.error(error);
//       }
//     },
//   });

//   return (
//     <Container>
//       <Toaster />
//       <FormikProvider value={formik}>
//         <form onSubmit={formik.handleSubmit}>
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h4">Create Product</Typography>
//           </Box>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.name && formik.touched.name)}
//             helperText={formik.errors.name}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.description && formik.touched.description)}
//             helperText={formik.errors.description}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             fullWidth
//             label="Minimum Price"
//             name="minPrice"
//             type="number"
//             value={formik.values.minPrice}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.minPrice && formik.touched.minPrice)}
//             helperText={formik.errors.minPrice}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             fullWidth
//             label="Currency"
//             name="currency"
//             value={formik.values.currency}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.currency && formik.touched.currency)}
//             helperText={formik.errors.currency}
//             sx={{ mb: 3 }}
//           />
//           <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(formik.errors.categoryId && formik.touched.categoryId)}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               label="Category"
//               name="categoryId"
//               value={formik.values.categoryId}
//               onChange={formik.handleChange}
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category?._id} value={category?._id}>
//                   {category?.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.errors.categoryId && formik.touched.categoryId && (
//               <FormHelperText>{formik.errors.categoryId}</FormHelperText>
//             )}
//           </FormControl>


//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
//             <InputLabel sx={{ ml: 1 }}>Product Image</InputLabel>
//             <input
//               accept="image/*"
//               style={{ display: 'none' }}
//               id="raised-button-file"
//               type="file"
//               onChange={(event) => {
//                 formik.setFieldValue("images", event.currentTarget.files[0]);
//               }} />
//             <label htmlFor="raised-button-file">
//               <Button
//                 variant="contained"
//                 color={
//                   formik.errors.images && formik.touched.images
//                     ? 'error'
//                     : formik.values.images
//                       ? 'success'
//                       : 'primary'
//                 }
//                 component="span"
//                 startIcon={<CloudUploadIcon />}
//                 style={{ margin: '8px', marginBottom: '21px' }}
//               >
//                 Upload
//               </Button>
//             </label>
//             {formik.errors.images && formik.touched.images && (
//               <FormHelperText error sx={{ ml: 1 }}>{formik.errors.images}</FormHelperText>
//             )}
//           </Box>


//           <FieldArray name="sizesAndColors">
//             {({ push, remove }) => (
//               <Box>
//                 {formik.values.sizesAndColors.map((item, index) => (
//                   <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
//                     <Grid item xs={3}>
//                       <TextField
//                         fullWidth
//                         label="Size"
//                         name={`sizesAndColors.${index}.size`}
//                         value={formik.values.sizesAndColors[index].size}
//                         onChange={formik.handleChange}
//                         error={Boolean(
//                           formik.errors.sizesAndColors?.[index]?.size &&
//                           formik.touched.sizesAndColors?.[index]?.size
//                         )}
//                         helperText={formik.errors.sizesAndColors?.[index]?.size}
//                       />
//                     </Grid>
//                     <Grid item xs={3}>
//                       <TextField
//                         fullWidth
//                         label="Color"
//                         name={`sizesAndColors.${index}.color`}
//                         value={formik.values.sizesAndColors[index].color}
//                         onChange={formik.handleChange}
//                         error={Boolean(
//                           formik.errors.sizesAndColors?.[index]?.color &&
//                           formik.touched.sizesAndColors?.[index]?.color
//                         )}
//                         helperText={formik.errors.sizesAndColors?.[index]?.color}
//                       />
//                     </Grid>
//                     <Grid item xs={3}>
//                       <TextField
//                         fullWidth
//                         label="Price"
//                         name={`sizesAndColors.${index}.price`}
//                         type="number"
//                         value={formik.values.sizesAndColors[index].price}
//                         onChange={formik.handleChange}
//                         error={Boolean(
//                           formik.errors.sizesAndColors?.[index]?.price &&
//                           formik.touched.sizesAndColors?.[index]?.price
//                         )}
//                         helperText={formik.errors.sizesAndColors?.[index]?.price}
//                       />
//                     </Grid>
//                     <Grid item xs={2}>
//                       <TextField
//                         fullWidth
//                         label="Stock"
//                         name={`sizesAndColors.${index}.stock`}
//                         type="number"
//                         value={formik.values.sizesAndColors[index].stock}
//                         onChange={formik.handleChange}
//                         error={Boolean(
//                           formik.errors.sizesAndColors?.[index]?.stock &&
//                           formik.touched.sizesAndColors?.[index]?.stock
//                         )}
//                         helperText={formik.errors.sizesAndColors?.[index]?.stock}
//                       />
//                     </Grid>
//                     <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => remove(index)}
//                         disabled={formik.values.sizesAndColors.length === 1}
//                       >
//                         <RemoveCircle />
//                       </IconButton>
//                       <IconButton color="primary" onClick={() => push({ size: '', color: '', price: 0, stock: 0 })}>
//                         <AddCircle />
//                       </IconButton>
//                     </Grid>
//                   </Grid>
//                 ))}
//               </Box>
//             )}
//           </FieldArray>
//           <TextField
//             fullWidth
//             label="Total Stock"
//             name="totalStock"
//             type="number"
//             value={formik.values.totalStock}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.totalStock && formik.touched.totalStock)}
//             helperText={formik.errors.totalStock}
//             sx={{ mb: 3 }}
//           />
//           <TextField
//             fullWidth
//             label="Discount"
//             name="discount"
//             type="number"
//             value={formik.values.discount}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.discount && formik.touched.discount)}
//             helperText={formik.errors.discount}
//             sx={{ mb: 3 }}
//           />
//           <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(formik.errors.productType && formik.touched.productType)}>
//             <InputLabel>Product Type</InputLabel>
//             <Select
//               label="Product Type"
//               name="productType"
//               value={formik.values.productType}
//               onChange={formik.handleChange}
//             >
//               {productTypes.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.errors.productType && formik.touched.productType && (
//               <FormHelperText>{formik.errors.productType}</FormHelperText>
//             )}
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(formik.errors.categoryId && formik.touched.categoryId)}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               label="Category"
//               name="categoryId"
//               value={formik.values.categoryId}
//               onChange={formik.handleChange}
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category?._id} value={category?._id}>
//                   {category?.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.errors.categoryId && formik.touched.categoryId && (
//               <FormHelperText>{formik.errors.categoryId}</FormHelperText>
//             )}
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Made From"
//             name="madeFrom"
//             value={formik.values.madeFrom}
//             onChange={formik.handleChange}
//             error={Boolean(formik.errors.madeFrom && formik.touched.madeFrom)}
//             helperText={formik.errors.madeFrom}
//             sx={{ mb: 3 }}
//           />
//           <div style={{ position: 'relative', height: '50px' }}>
//             <Button
//               type="submit"
//               sx={{
//                 position: 'absolute',
//                 right: 0,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//               }}
//               variant="contained"
//               color="primary"
//             >
//               Submit
//             </Button>
//           </div>

//         </form>
//       </FormikProvider>
//     </Container>
//   );
// };

// export default ProductForm;

import React, { useEffect, useState } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography, IconButton, Grid, Container, InputLabel, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Toaster, toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../react-redux/hooks/reduxHooks';
import { createNewProduct, updateProductSaga } from '../../../react-redux/slices/actions/productActions';
import { useParams } from 'react-router-dom';
import { getAllCategory } from '../../../react-redux/slices/actions/categoryActions';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  currency: Yup.string().required('Currency is required'),
  categoryId: Yup.string().required('Select a Category'),
  sizesAndColors: Yup.array()
    .of(
      Yup.object({
        size: Yup.string().required('Size is required'),
        color: Yup.string().required('Color is required'),
        price: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
        stock: Yup.number().min(0, 'Stock cannot be negative').required('Stock is required'),
      })
    )
    .min(1, 'At least one size and color combination is required'),
  discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100'),
  productType: Yup.string().required('Product type is required'),
  madeFrom: Yup.string().required('Material is required'),
  images: Yup.mixed().required('Image is required'),
});

const initialValues = {
  name: '',
  description: '',
  currency: 'INR',
  categoryId: '',
  sizesAndColors: [{ size: '', color: '', price: 0, stock: 0 }],
  discount: 0,
  productType: '3DModelWithLogo',
  madeFrom: 'Plastic',
  images: null,
};

const productTypes = [
  '3DModelWithLogo',
  '3DModelWithoutLogo',
  '3DSoftwareWithLogo',
  '3DSoftwareWithoutLogo',
  '3DModelWithLogo & 3DSoftwareWithLogo',
  '3DModelWithLogo & 3DSoftwareWithoutLogo',
  '3DModelWithoutLogo & 3DSoftwareWithLogo',
  '3DModelWithoutLogo & 3DSoftwareWithoutLogo'
];

const ProductForm = () => {
  const categories = useAppSelector((state) => state.categories.category);
  const { products } = useAppSelector((state) => state);
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  useEffect(()=>{
      dispatch(getAllCategory())
  },[ ])

  useEffect(() => {
    if (productId && products.products.length > 0) {
      const editProduct = products.products.find((product) => product._id === productId)
      if (editProduct) {
        setInitialFormValues({
          name: editProduct.name,
          description: editProduct.description,
          currency: editProduct.currency,
          categoryId: editProduct.categoryId,
          sizesAndColors: editProduct.sizesAndColors,
          discount: editProduct.discount,
          productType: editProduct.productType,
          madeFrom: editProduct.madeFrom,
          images: null,
        });
        setIsEditing(true);
      }
    }
  }, [productId, products.products]);

  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log("form")
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'sizesAndColors') {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === 'images') {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });
        console.log("in form")
        if (isEditing) {
          console.log("edit",...formData)
          dispatch(updateProductSaga(formData, productId));
        } else {
          console.log("create")
          dispatch(createNewProduct(formData));
        }

        toast.success('Product saved successfully')
      } catch (error) {
        toast.error('Error saving product');
        console.error(error);
      }
    },
  });

  return (
    <Container>
      <Toaster />
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">{isEditing ? 'Edit Product' : 'Create Product'}</Typography>
          </Box>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name && formik.touched.name)}
            helperText={formik.errors.name}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            variant='outlined'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.description && formik.touched.description)}
            helperText={formik.errors.description}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.currency && formik.touched.currency)}
            helperText={formik.errors.currency}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
            <InputLabel sx={{ ml: 1 }}>Product Image</InputLabel>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={(event) => {
                formik.setFieldValue('images', event.currentTarget.files[0]);
              }}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color={
                  formik.errors.images && formik.touched.images
                    ? 'error'
                    : formik.values.images
                      ? 'success'
                      : 'primary'
                }
                component="span"
                startIcon={<CloudUploadIcon />}
                style={{ margin: '8px', marginBottom: '21px' }}
              >
                Upload
              </Button>
            </label>
            {formik.errors.images && formik.touched.images && (
              <FormHelperText error sx={{ ml: 1 }}>{formik.errors.images}</FormHelperText>
            )}
          </Box>

                   <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(formik.errors.categoryId && formik.touched.categoryId)}>
             <InputLabel>Category</InputLabel>
            <Select
               label="Category"
               name="categoryId"
               value={formik.values.categoryId}
            onChange={formik.handleChange}
             >
               {categories.map((category) => (
                 <MenuItem key={category?._id} value={category?._id}>
                   {category?.name}
                 </MenuItem>
               ))}
             </Select>
             {formik.errors.categoryId && formik.touched.categoryId && (
               <FormHelperText>{formik.errors.categoryId}</FormHelperText>
             )}
           </FormControl> 


          <FieldArray name="sizesAndColors">
            {({ push, remove }) => (
              <Box>
                {formik.values.sizesAndColors.map((item, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Size"
                        name={`sizesAndColors.${index}.size`}
                        value={formik.values.sizesAndColors[index].size}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.errors.sizesAndColors?.[index]?.size &&
                          formik.touched.sizesAndColors?.[index]?.size
                        )}
                        helperText={formik.errors.sizesAndColors?.[index]?.size}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Color"
                        name={`sizesAndColors.${index}.color`}
                        value={formik.values.sizesAndColors[index].color}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.errors.sizesAndColors?.[index]?.color &&
                          formik.touched.sizesAndColors?.[index]?.color
                        )}
                        helperText={formik.errors.sizesAndColors?.[index]?.color}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        label="Price"
                        name={`sizesAndColors.${index}.price`}
                        type="number"
                        value={formik.values.sizesAndColors[index].price}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.errors.sizesAndColors?.[index]?.price &&
                          formik.touched.sizesAndColors?.[index]?.price
                        )}
                        helperText={formik.errors.sizesAndColors?.[index]?.price}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        label="Stock"
                        name={`sizesAndColors.${index}.stock`}
                        type="number"
                        value={formik.values.sizesAndColors[index].stock}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.errors.sizesAndColors?.[index]?.stock &&
                          formik.touched.sizesAndColors?.[index]?.stock
                        )}
                        helperText={formik.errors.sizesAndColors?.[index]?.stock}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => remove(index)}>
                        <RemoveCircle color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    push({ size: '', color: '', price: 0, stock: 0 })
                  }
                  sx={{mb:3}}
                  variant="outlined"
                  color="primary"
                >
                  Add Size and Color <AddCircle />
                </Button >
              </Box>
            )}
          </FieldArray>
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            type="number"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.discount && formik.touched.discount)}
            helperText={formik.errors.discount}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth error={Boolean(formik.errors.productType && formik.touched.productType)} sx={{ mb: 3 }}>
            <InputLabel>Product Type</InputLabel>
            <Select
              name="productType"
              value={formik.values.productType}
              onChange={formik.handleChange}
            >
              {productTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.errors.productType}</FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            label="Material"
            name="madeFrom"
            value={formik.values.madeFrom}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.madeFrom && formik.touched.madeFrom)}
            helperText={formik.errors.madeFrom}
            sx={{ mb: 3 }}
          />
     <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={()=>{
                console.log("clicked")
              }}
              
             >
              {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
        </form>
      </FormikProvider>
    </Container>
  );
};

export default ProductForm;

