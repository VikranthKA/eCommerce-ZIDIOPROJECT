import React, { useEffect } from 'react'
import {useAppDispatch,useAppSelector} from "../../../react-redux/hooks/reduxHooks"
import {getAllCategory} from "../../../react-redux/slices/actions/categoryActions" 
import CategoryCard from './CategoryCard'
const AllCategory = () => {
    const categories = useAppSelector((state)=>state.categories.category)
    console.log(categories,"allcategory")

    const dispatch  = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCategory())
    },[])
  return (
    <div>
      {
        categories.length>=0 && categories.map((category)=>(
          
          <CategoryCard
            name={category.name}
            _id={category._id}
            image={category.image}
          />
        ))
      }
    </div>
  )
}

export default AllCategory
