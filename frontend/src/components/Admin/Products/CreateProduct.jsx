import { TextField, FormGroup, Container, FormLabel, FormControl } from '@mui/material'
import React, { useState } from 'react'

const CreateProduct = () => {
  const [stateFrom,setStateFrom] = useState({
    name:"Product Name",
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
