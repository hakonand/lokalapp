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
  CardMedia,
  Grid,
  Skeleton
} from '@material-ui/core'; //
import { experimentalStyled as styled } from '@material-ui/core/styles';

import StorefrontAbout from './StorefrontAbout';
import StorefrontPostCard from './StorefrontPostCard';
import StorefrontFollowInfo from './StorefrontFollowInfo';
import StorefrontSocialInfo from './StorefrontSocialInfo';
import StorefrontProducts from './StorefrontProducts';

import StorefrontBlogPostCard from './StorefrontBlogPostCard';

import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';

// ----------------------------------------------------------------------

StorefrontGuidesPosts.propTypes = {
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

export default function StorefrontGuidesPosts({ myProfile }) {
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  // hasmore = https://firebase.google.com/docs/firestore/query-data/query-cursors

  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const [cathegoryLineOne, setCathegoryLineOne] = useState([
    {
      image: <IconStyle icon={heartOutline} />,
      name: 'Best Sellers',
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

  const [cathegoryLineTwo, setCathegoryLineTwo] = useState([
    {
      image: 'none yet',
      name: 'Bedroom',
      link: 'ViewProducts'
    },
    {
      image: 'none yet',
      name: 'Kitchen',
      link: 'ViewProducts'
    },
    {
      image: 'none yet',
      name: 'Lighting',
      link: 'ViewProducts'
    }
  ]);

  //  firebase fucntion then limit and or slice the data for pagination see ./storefrontLandingPage comment

  /* eslint prefer-arrow-callback: 0 */

  // useEffect(() => {});

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: 'inherit' }}
        >
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <StorefrontBlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
}
