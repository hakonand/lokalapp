import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
// material
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import { Icon } from '@iconify/react';
import trendingUpOutline from '@iconify/icons-eva/trending-up-outline';

import heartOutline from '@iconify/icons-eva/heart-outline';

import plusCircleOutline from '@iconify/icons-eva/plus-circle-outline';
import starOutline from '@iconify/icons-eva/star-outline';

import arrowForwardOutline from '@iconify/icons-eva/arrow-forward-outline';
import StarsIcon from '@material-ui/icons/Stars';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Box,
  Link,
  Card,
  Typography,
  CardHeader,
  IconButton,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Skeleton,
  Button
} from '@material-ui/core'; //
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import StorefrontAbout from './StorefrontAbout';
import StorefrontPostCard from './StorefrontPostCard';
import StorefrontFollowInfo from './StorefrontFollowInfo';
import StorefrontSocialInfo from './StorefrontSocialInfo';
import StorefrontProducts from './StorefrontProducts';
import StorefrontProductList from './StorefrontProductList';

import StorefrontBlogPostCard from './StorefrontBlogPostCard';

import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';

// ----------------------------------------------------------------------

StorefrontLandingPage.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
  authUser: PropTypes.object
};

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 50,
  height: 50,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
  color: 'white'
}));

const SmallIconStyle = styled(Icon)(({ theme }) => ({
  width: 30,
  height: 30,
  marginTop: 1,
  display: 'flex',
  justifyContent: 'center'
}));

const SkeletonLoad = (
  <Box sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ height: 200, borderRadius: 2 }}
          />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function StorefrontLandingPage({ myProfile, setCurrentTab }) {
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const theme = useTheme();
  // hasmore = https://firebase.google.com/docs/firestore/query-data/query-cursors

  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const [categoryLineOne, setCathegoryLineOne] = useState([
    {
      image: <IconStyle icon={heartOutline} color="#212B36" />,
      name: 'Our Favourites',
      link: 'ViewProducts'
    }
  ]);

  // replace this with a firebase fucntion then limit and or slice the data

  const threePosts = posts.slice(0, 3);

  /* eslint prefer-arrow-callback: 0 */

  // useEffect(() => {});

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
    },
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Grid item xs={12} spacing={2} sx={{ margin: theme.spacing(1) }}>
          <Card>
            <CardActionArea>
              <CardContent
                style={{
                  backgroundColor: theme.palette.warning.light,
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'black'
                }}
              >
                <IconStyle icon={starOutline} color="#212B36" />
                <CardHeader
                  title="Bonus Program"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#212B36',
                    padding: 15
                  }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {categoryLineOne.map((category) => (
          <Grid
            item
            xs={12}
            spacing={1}
            sx={{ margin: theme.spacing(1) }}
            key={category.name}
          >
            <Card>
              <CardActionArea>
                <CardContent
                  style={{
                    backgroundColor: theme.palette.primary.lighter,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {category.image}
                  <CardHeader
                    title={category.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      color: '#212B36',
                      padding: 15
                    }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} spacing={2} sx={{ margin: theme.spacing(1) }}>
          <StorefrontAbout profile={myProfile} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <StorefrontProductList products={productsArray} />
      </Grid>

      <Grid item xs={12} md={12}>
        <StorefrontProductList products={productsArray} />
      </Grid>
    </Grid>
  );
}

// <Grid item xs={12} md={12}>
// <InfiniteScroll
//   next={onScroll}
//   hasMore={hasMore}
//   loader={SkeletonLoad}
//   dataLength={posts.length}
//   style={{ overflow: 'inherit' }}
// >
//   <Grid container spacing={3}>
//     {threePosts.map((post, index) => (
//       <StorefrontBlogPostCard key={post.id} post={post} index={index} />
//     ))}
//   </Grid>
// </InfiniteScroll>
// </Grid>

// <Card>
//           <CardHeader title="Browse Categories" />
//           <CardContent>
//             <Grid container spacing={1}>
//               {categoryLineOne.map((category) => (
//                 <Grid item xs={4} key={category.name}>
//                   <Card>
//                     <CardActionArea>
//                       <CardContent
//                         style={{
//                           backgroundColor: theme.palette.primary.darker,
//                           display: 'flex',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         {category.image}
//                       </CardContent>
//                       <CardHeader
//                         title={category.name}
//                         style={{
//                           display: 'flex',
//                           justifyContent: 'center',
//                           backgroundColor: '#F9FAFB',
//                           color: '#212B36',
//                           padding: 15
//                         }}
//                       />
//                     </CardActionArea>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//             <br />
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 padding: 15
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="large"
//                 onClick={() => setCurrentTab('products')}
//                 endIcon={
//                   <SmallIconStyle icon={arrowForwardOutline} size="small" />
//                 }
//               >
//                 See all products{' '}
//               </Button>{' '}
//             </div>
//           </CardContent>
//         </Card>
