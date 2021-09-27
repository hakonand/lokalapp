import PropTypes from 'prop-types';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  CardContent,
  CardActionArea,
  CardHeader,
  Container,
  Button,
  Skeleton,
  Grid
} from '@material-ui/core';
import { Icon } from '@iconify/react';

import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import plusCircleOutline from '@iconify/icons-eva/plus-circle-outline';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------
import ViewProductCards from './ViewProductCards';

export default function ViewProductList({ products, isLoading }) {
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

  const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  });

  const IconStyle = styled(Icon)(({ theme }) => ({
    width: '100%',
    height: '100%',
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
    color: 'white'
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Link
            to={PATH_DASHBOARD.general.createproduct}
            color="inherit"
            component={RouterLink}
          >
            <CardActionArea>
              <Box
                style={{
                  backgroundColor: '#C8FACD',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <IconStyle icon={plusCircleOutline} />
              </Box>
              <CardContent>
                <Typography> Create new product </Typography>
                <Typography variant="body2" noWrap>
                  Click here to get started
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Grid>
      {isLoading
        ? SkeletonLoad
        : products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <ViewProductCards product={product} />
            </Grid>
          ))}
    </Grid>
  );
}
