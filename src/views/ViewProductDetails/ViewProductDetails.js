import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import { useDispatch, useSelector } from 'react-redux';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderDashboard from '../../components/HeaderDashboard';

import ViewProductDetailsCarousel from './ViewProductDetailsCarousel';
import ViewProductDetailsSummary from './ViewProductDetailsSumary';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Fake items are 100% forbidden',
    icon: roundVerified
  },
  {
    title: '14 Day Replacement',
    description: 'items that appear as new can be returned within 14 days',
    icon: clockFill
  },
  {
    title: 'Protection',
    description:
      'All purchases through our platform is vetted for fraud & misuse',
    icon: roundVerifiedUser
  }
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function EcommerceProductDetails() {
  const [value, setValue] = useState('1');

  // const [productId, setProductId] = useState('askdjlasdjalsdjalkds  ');
  // const [productImages, setProductImages] = useState([
  //   'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/shirt.png?alt=media&token=c04d4599-c5b5-4eb5-8238-0a6ab17a6b3f',
  //   'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/dumbbell%20(1).png?alt=media&token=4509db47-6c16-414c-9818-b6daa634ba57'
  // ]);
  // const [productName, setProductName] = useState('testtest');
  // const [productPrice, setProductPrice] = useState(199);
  // const [productColors, setProductColors] = useState([
  //   'purple',
  //   'black',
  //   'midnight blue'
  // ]);
  // const [productSizes, setProductSizes] = useState(['small', 'medium']);
  // const [productStatus, setProductStatus] = useState('');
  // const [productInventoryType, setProductInventoryType] = useState('in_stock');
  // const [productAvaiable, setProductAvaiable] = useState(true);
  // const [productOwner, setProductOwner] = useState('Clarke Bodø');

  const [product, setProduct] = useState({
    id: 'fc68bad5-d430-4033-b8f8-4bc069dc0ba0',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f'
    ],
    name: 'testtest',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis tellus et nulla euismod auctor. Nullam sit amet diam sed mauris maximus sodales. Praesent pretium, dui vel tincidunt iaculis, urna urna iaculis nisl, et mollis libero lorem et justo. Etiam euismod, turpis in condimentum pharetra, diam arcu bibendum odio, et molestie nulla neque nec massa. Fusce fringilla purus nec erat elementum, non scelerisque purus vehicula. Mauris non erat at odio ultricies scelerisque eu vel leo. Class aptent. Nam consectetur magna a orci facilisis placerat. Aenean ultrices justo id neque convallis, vulputate elementum nulla eleifend. Proin convallis diam ut lectus bibendum egestas. Phasellus condimentum neque quis lacus vulputate, vitae malesuada metus porta.',
    price: 123,
    colors: ['purple', 'black', 'midnight blue'],
    sizes: ['small', 'medium', 'large'],
    inventoryType: 'in_stock',
    status: 'sale'
  });
  /* eslint prefer-arrow-callback: 0 */

  const handleChangeTab = (event, newValue) => {
    console.log('setnewTab');
  };

  const handleAddCart = () => {
    console.log('added to cart');
  };

  const handleGotoStep = (step) => {
    console.log('gotostep');
  };

  return (
    <Page title="Ecommerce: Product Details | Minimal-UI">
      {product ? (
        <Container>
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <div className={{ padding: 10 }}>
                    <ViewProductDetailsCarousel
                      productImages={product.images}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ViewProductDetailsSummary
                    productName={product.name}
                    productPrice={product.price}
                    productSizes={product.sizes}
                    productColors={product.colors}
                    productInventoryType={product.inventoryType}
                    productStatus={product.status}
                    productDescription={product.description}
                    productAvaiable={product.avaiable}
                    productOwner={product.owner}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box
                    sx={{
                      my: 2,
                      mx: 'auto',
                      maxWidth: 280,
                      textAlign: 'center'
                    }}
                  >
                    <IconWrapperStyle>
                      <Icon icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        </Container>
      ) : (
        SkeletonLoad
      )}
    </Page>
  );
}
