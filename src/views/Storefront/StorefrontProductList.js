import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------
import StorefrontProductCards from './StorefrontProductCards';

export default function StorefrontProductList({ products, isLoading }) {
  const SkeletonLoad = (
    <>
      {[...Array(12)].map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ paddingTop: '115%', borderRadius: 2 }}
          />
        </Grid>
      ))}
    </>
  );

  return (
    <Grid container spacing={3}>
      {isLoading
        ? SkeletonLoad
        : products.map((product) => (
            <Grid key={product.id} item xs={12} sm={8} md={6}>
              <StorefrontProductCards product={product} />
            </Grid>
          ))}
    </Grid>
  );
}
