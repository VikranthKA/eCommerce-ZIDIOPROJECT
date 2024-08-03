import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../react-redux/hooks/reduxHooks';
import { getCategoryIdForEdit } from '../../../react-redux/slices/actions/categoryActions';

const Root = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height:200,
  margin: 15,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',//liitle zooom out
  },
});

const Details = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const Cover = styled(CardMedia)({
  width: 120,
  height: 120,
  borderRadius: '100%',
  margin: '16px 0',
});

export default function CategoryCard({ _id, name, image }) {
    const dispatch = useAppDispatch()
  return (
    <Root key={_id}>
        {console.log(_id)}
      <Cover
        component="img"
        image={image}
        alt={name}
      />
      <Details>
        <CardContent>
          <Typography component="h5" variant="h5">
            {name}
            <EditIcon onClick={()=>{
                dispatch(getCategoryIdForEdit(_id))
            }}/>
          </Typography>
        </CardContent>
      </Details>
    </Root>
  );
}
