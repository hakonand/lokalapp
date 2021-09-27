import { useState, useEffect } from 'react';

import { Box, Card, Typography } from '@material-ui/core';
// utils

export default function EcommerceClickCollectOrders() {
  const [number, setNumber] = useState();

  const [orders, setOrders] = useState([
    {
      id: 'ab',
      name: 'name',
      price: '10',
      fulfillmentType: 'Click & Collect',
      createdAt: '02.02.2021',
      orderStatus: 'Unattended',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    },
    {
      id: 'cd',
      name: 'name1',
      price: '11',
      fulfillmentType: 'Shipping',
      createdAt: '01.01.2021',
      orderStatus: 'Ready',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    },
    {
      id: 'ef',
      name: 'name1',
      price: '11',
      fulfillmentType: 'Custom Shipping',
      createdAt: '01.01.2021',
      orderStatus: 'Ready',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    }
  ]);

  useEffect(() => {
    let output = 0;
    orders.forEach((e) => {
      if (e.orderStatus === 'Ready') {
        output += 1;
      }
    });
    setNumber(output);
  }, [orders]);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Waiting for pickup by customer
        </Typography>
        <Typography variant="h3" gutterBottom>
          {number}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption">
            Customers are notified & should pickup their order soon
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
