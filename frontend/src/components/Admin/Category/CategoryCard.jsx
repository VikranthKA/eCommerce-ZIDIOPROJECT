import React from 'react';
import { Button, TextField, Box, Typography, IconButton, Grid, Container, InputLabel, Select, MenuItem, FormControl, FormHelperText, Card, CardContent, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width:400,
        margin:15   
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 100,
        borderRadius: "50%",
        margin:5
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 2,
        paddingBottom: 2,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

export default function CategoryCard({ _id, name, image }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} key={_id}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>

                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={image}
                title="image"
            />
        </Card>
    );
}
