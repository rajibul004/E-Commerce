// src/components/profile/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, {user?.username || 'User'}!
      </Typography>
      {user?.role === 'ADMIN' && (
        <div className="mt-4">
          <Typography variant="h6" gutterBottom>
            Admin Actions
          </Typography>
          <Link to="/admin/add-product" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Add New Product
            </Button>
          </Link>
        </div>
      )}
      <div className="mt-4">
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>
        <Typography variant="body1">Email: {user?.email || 'N/A'}</Typography>
        <Typography variant="body1">Role: {user?.role || 'N/A'}</Typography>
      </div>
    </div>
  );
};

export default Profile;