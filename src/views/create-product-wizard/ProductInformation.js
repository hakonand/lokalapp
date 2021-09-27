import React, { useState } from 'react';

import {
  Button,
  Grid,
  Divider,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader
} from '@material-ui/core';

const ProductInformation = ({
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productDescription,
  setProductDescription,
  productMainPicture,
  setProductMainPicture
}) => {
  const [imagesArray, setImagesArray] = useState();

  const [isLoading, setIsLoading] = useState(null);

  const consolelog = () => {
    console.log(imagesArray);
  };

  return (
    <Card>
      <CardHeader
        title="Name, Price & Description"
        subheader="Set a name, price and description for the product"
        titleTypographyProps={{ color: 'textPrimary' }}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              value={productName}
              name="productName"
              label="Name"
              id="productName"
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              type="number"
              value={productPrice}
              id="productPrice"
              label="Price"
              name="productPrice"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          name="productDescription"
          value={productDescription}
          label="Description"
          multiline="true"
          rows={4}
          rowsMax={15}
          id="productDescription"
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default ProductInformation;
