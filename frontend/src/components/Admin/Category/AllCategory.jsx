import React, { useEffect } from 'react'
import {useAppDispatch,useAppSelector} from "../../../react-redux/hooks/reduxHooks"
import {getAllCategory} from "../../../react-redux/slices/actions/categoryActions" 
const AllCategory = () => {
    const categories = useAppSelector((state)=>state.categories.category)
    console.log(categories,"allcategory")

    const dispatch  = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCategory())
    },[])
  return (
    <div>
      All Category
    </div>
  )
}

export default AllCategory
