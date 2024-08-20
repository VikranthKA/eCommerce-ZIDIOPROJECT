import React, { useState } from 'react';
import ProfileSideBar from '../ProfileSideBar';
import { Container } from '@mui/material';
import { useAppSelector } from '../../../react-redux/hooks/reduxHooks';
import AddressForm from './AddressForm';
import AddressCard from "./AddressCard"

const Address = () => {
  const { profile } = useAppSelector(state => state.profile);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleFormClose = () => {
    setEditingAddress(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ProfileSideBar />
      <Container sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {profile?.addresses && profile.addresses.length > 0 ? (
          <>
            {profile.addresses.map((address) => (
              <div key={address._id}>
                {editingAddress && editingAddress._id === address._id ? (
                  <AddressForm address={editingAddress} onClose={handleFormClose} />
                ) : (
                  <AddressCard
                    {...address}
                    onEdit={() => handleEditAddress(address)}
                  />
                )}
              </div>
            ))}
            {profile.addresses.length <= 3 && !editingAddress && (
              <AddressForm onClose={handleFormClose} />
            )}
          </>
        ) : (
          <AddressForm onClose={handleFormClose} />
        )}
      </Container>
    </div>
  );
};

export default Address;
