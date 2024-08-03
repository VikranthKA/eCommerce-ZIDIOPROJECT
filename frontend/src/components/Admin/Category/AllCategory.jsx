import React, { useEffect } from 'react'
import {useAppDispatch,useAppSelector} from "../../../react-redux/hooks/reduxHooks"
import {getAllCategory} from "../../../react-redux/slices/actions/categoryActions" 
import CategoryCard from './CategoryCard'
import CreateCategory from './CreateCategory'
import { Box, Container } from '@mui/material'
const AllCategory = () => {
    const categories = useAppSelector((state)=>state.categories.category)
    console.log(categories,"allcategory")

    const dispatch  = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCategory())
    },[])
  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((category) => (
          <CategoryCard
            _id={category._id}
            name={category.name}
            image={category.image}
          />
        ))}
      </Box>
    </Container>
  )
}

export default AllCategory
