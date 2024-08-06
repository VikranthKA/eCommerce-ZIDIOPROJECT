import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch,useAppSelector } from '../../../react-redux/hooks/reduxHooks';

import { getCategoryIdForEdit, removeCategory, removeCategoryIdForEdit } from '../../../react-redux/slices/actions/categoryActions';
import { toast } from 'react-toastify';

const Root = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 200,
  margin: 15,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  transition: 'transform 0.3s',
  position: 'relative', // Ensuring relative positioning for absolute children
  '&:hover': {
    transform: 'scale(1.05)', // little zoom out
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
  margin: '25px 5px 0 5px',
});

const IconTag = styled(Box)({
  position: 'absolute', // Absolute positioning
  top: '8px', // Positioning at the top
  right: '8px', // Positioning at the right
  display: 'flex',
  gap: '5px',
});

export default function CategoryCard({ _id, name, image }) {
  const dispatch = useAppDispatch();

  return (
    <Root key={_id}>
      <IconTag>
        <EditIcon
          onClick={() => {
            dispatch(getCategoryIdForEdit(_id));
          }}
        />
        <DeleteIcon 
        onClick={()=>{
          dispatch(removeCategory(_id));
          console.log("delete clicked")
        }}/>
      </IconTag>

      <Cover component="img" image={image} alt={name} />
      <Details>
        <CardContent>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
        </CardContent>
      </Details>
    </Root>
  );
}
