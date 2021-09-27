import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Typography,
  Container
} from '@material-ui/core';

import StorefrontProductList from './StorefrontProductList';

// ----------------------------------------------------------------------

StorefrontProducts.propTypes = {
  followers: PropTypes.array.isRequired,
  onToggleFollow: PropTypes.func,
  sx: PropTypes.object
};

export default function StorefrontProducts({ followers, onToggleFollow, sx }) {
  const [isLoading, setIsLoading] = useState(false);

  const [productsArray, setProductsArray] = useState([
    {
      id: 'fc68bad5-d430-4033-b8f8-4bc069dc0ba0',
      cover:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f',
      images: '../../images/img1',
      name: 'Nike Airforce NMD R1',
      price: 123,
      colors: ['purple', 'black', 'midnight blue'],
      inventoryType: 'in_stock',
      status: 'sale'
    },
    {
      id: 'fc681231221bad5-d430-4033-b8f8-4bc069dc0ba0',
      cover:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img3.jpg?alt=media&token=3753f448-8cf6-40d1-9d74-08243e075da0',
      images: 'C:/Users/hakon/production/lokalapp/src/images/img1.jpg',
      name: 'Test2',
      price: 1234,
      colors: ['blue', 'red', 'purple', 'yellow', 'black'],
      inventoryType: 'in_stock',
      status: 'sale'
    }
  ]);
  /* eslint prefer-arrow-callback: 0 */

  useEffect(() => {});

  return (
    <Container component="main">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>
      <StorefrontProductList products={productsArray} isLoading={isLoading} />
    </Container>
  );
}
