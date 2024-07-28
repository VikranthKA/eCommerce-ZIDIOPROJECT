import { TextField, FormGroup, Container, FormLabel, FormControl } from '@mui/material'
import React, { useState } from 'react'

const CreateProduct = () => {
  const [stateFrom,setStateFrom] = useState({

    name:String,
    categoryId:"",
    description: "",
    price:"",
    sizesAndColors: [{
            size:"S", 
            color:"green",
            stock:10
    }],
    productType: "",
    discount:10,
    madeFrom:" "
})
  return (
    <div>
      <Container sx={{mt:5}}>
        <form>
            <FormLabel>Name</FormLabel>

        </form>
      </Container>

    </div>
  )
}

export default CreateProduct
