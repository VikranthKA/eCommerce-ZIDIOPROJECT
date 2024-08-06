import { Card, Typography } from '@mui/material'
import React from 'react'

const Analytics = () => {


    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>
                <Typography>Total earning</Typography>
            </Card>
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>
            <Typography>Total orders</Typography>

            </Card> 
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>
            <Typography>Total users</Typography>

            </Card>
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>

            </Card>  
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>

            </Card>
            <Card style={{ width: "100px", height: "100px", border: "2px solid black" }}>

            </Card>
        </div>
    )
}

export default Analytics
