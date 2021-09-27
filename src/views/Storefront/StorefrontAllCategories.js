import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
// material
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import { Icon } from '@iconify/react';
import trendingUpOutline from '@iconify/icons-eva/trending-up-outline';

import heartOutline from '@iconify/icons-eva/heart-outline';

import plusCircleOutline from '@iconify/icons-eva/plus-circle-outline';

import arrowForwardOutline from '@iconify/icons-eva/arrow-forward-outline';

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
  Container,
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

import StorefrontBlogPostCard from './StorefrontBlogPostCard';

import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';

// ----------------------------------------------------------------------

StorefrontAllCategories.propTypes = {
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

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function StorefrontAllCategories({ myProfile, setCurrentTab }) {
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  // hasmore = https://firebase.google.com/docs/firestore/query-data/query-cursors

  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);
  const theme = useTheme();
  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const [categoryLineOne, setCathegoryLineOne] = useState([
    {
      image: <IconStyle icon={heartOutline} />,
      name: 'Our Favorites',
      link: 'ViewProducts'
    },
    {
      image: <IconStyle icon={trendingUpOutline} />,
      name: 'Trending Now',
      link: 'ViewProducts'
    },
    {
      image: <IconStyle icon={plusCircleOutline} />,
      name: 'New Additions',
      link: 'ViewProducts'
    }
  ]);

  const [categoryLineTwo, setCathegoryLineTwo] = useState([
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img3.jpg?alt=media&token=3753f448-8cf6-40d1-9d74-08243e075da0',
      name: 'Bedroom',
      link: 'ViewProducts'
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f',

      name: 'Kitchen',
      link: 'ViewProducts'
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/aids-d763c.appspot.com/o/img1.jpg?alt=media&token=e1876b0d-16c4-4071-9df0-91356fd20e0f',

      name: 'Lighting',
      link: 'ViewProducts'
    }
  ]);

  // replace this with a firebase fucntion then limit and or slice the data

  const threePosts = posts.slice(0, 3);

  /* eslint prefer-arrow-callback: 0 */

  // useEffect(() => {});

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Browse Categories
      </Typography>
      <Grid container spacing={2}>
        {categoryLineTwo.map((category) => (
          <Grid item xs={12} md={4} key={category.name}>
            <Card>
              <CardActionArea>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                  <ProductImgStyle alt={category.name} src={category.image} />
                </Box>{' '}
              </CardActionArea>

              <div
                style={{
                  position: 'absolute',
                  top: theme.spacing(2),
                  padding: theme.spacing(1),
                  backgroundColor: theme.palette.secondary.light
                }}
              >
                <Typography variant="h6" noWrap>
                  {category.name}
                </Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>{' '}
    </Container>
  );
}
