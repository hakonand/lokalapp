import React, { useState, useContext, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

// material
import {
  Box,
  Card,
  Link,
  Typography,
  CardContent,
  CardActionArea,
  Container,
  Button
} from '@material-ui/core';

import ViewProductCards from './ViewProductCards';
import ViewProductList from './ViewProductList';

import firebase from '../../firebase/firebase';
import HeaderDashboard from '../../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../../routes/paths';

const ViewProducts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [productsArray, setProductsArray] = useState([
    {
      id: 'fc68bad5-d430-4033-b8f8-4bc069dc0ba0',
      cover:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f',
      images: '../../images/img1',
      name: 'testtest',
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
      <HeaderDashboard
        heading="View Products"
        subheader="Fill in the required fields to create product"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.general.maindashboard },
          { name: 'View Products' }
        ]}
      />
      <br />

      <ViewProductList products={productsArray} isLoading={isLoading} />
    </Container>
  );
};

export default ViewProducts;
