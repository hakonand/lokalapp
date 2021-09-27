import { useState, useEffect } from 'react';

import { Box, Card, Typography, Divider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

// utils

export default function NextFeature() {
  const [newOrders, setNewOrders] = useState('0');

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Social Media Assistant
        </Typography>

        <Typography variant="h3" gutterBottom>
          EST 4 Weeks
        </Typography>

        <LinearProgress />
        <br />

        <Typography variant="body2" gutterBottom>
          The Social Media Assistant will help you set a strategy and post
          content regularly to increase following and increase conversion
        </Typography>
        <Divider />
        <Typography variant="caption">The next feature in progress</Typography>
      </Box>
    </Card>
  );
}
