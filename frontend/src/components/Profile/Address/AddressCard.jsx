import { Edit, Home } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, Grid, Icon, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import AddressForm from './AddressForm';

const AdddressCard = ({ ...address }) => {
    const [isEdit, setIsEdit] = useState(false)

        return (
        <>
            {isEdit ?
                <div>
                   <AddressForm address={address} isEdit={isEdit} setIsEdit={setIsEdit}/>
                </div> : <div>

                    <Card sx={{ mt: 5, maxWidth: 300 }} key={address?._id}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Typography sx={{ mt: 2 }}>{address?.title}</Typography>
                            <IconButton sx={{ mt: 1 }} onClick={() => setIsEdit(true)}> {!isEdit && <Edit />}</IconButton>

                        </Box>

                        <CardContent sx={{ mx: 2 }}>
                            <Typography variant='body1'>{`${address?.building}, ${address?.locality},${address?.city},${address?.state}, ${address?.pincode},${address?.country}`}</Typography>


                        </CardContent>
                    </Card>
                </div>}
        </>
    )
}

export default AdddressCard