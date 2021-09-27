import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import heartFill from '@iconify/icons-eva/heart-fill';
import { useDispatch, useSelector } from 'react-redux';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

// material
import {
  useTheme,
  makeStyles,
  alpha,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Tab,
  Box,
  Card,
  Tabs,
  Container,
  Typography,
  Avatar
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// redux
import {
  getPosts,
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow
} from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';

import StorefrontAbout from './StorefrontAbout';
import StorefrontPostCard from './StorefrontPostCard';
import StorefrontFollowInfo from './StorefrontFollowInfo';
import StorefrontProducts from './StorefrontProducts';
import StorefrontGallery from './StorefrontGallery';
import StorefrontCover from './StorefrontCover';

import StorefrontSocialInfo from './StorefrontSocialInfo';
import StorefrontLandingPage from './StorefrontLandingPage';
import StorefrontGuidesPosts from './StorefrontGuidesPosts';
import StorefrontAllCategories from './StorefrontAllCategories';
import MyAvatar from '../../components/MyAvatar';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.ToolbarStyle
  }
}));

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  borderBottom: '1px solid #e8e8e8',
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
    paddingRight: theme.spacing(3)
  }
}));
const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
const TabsWrapperStyle2 = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  borderBottom: '1px solid #e8e8e8',
  width: '100%',
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
    paddingRight: theme.spacing(3)
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  padding: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Storefront() {
  const dispatch = useDispatch();
  const { myProfile, posts } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('profile');
  const theme = useTheme();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPosts());
  }, [dispatch]);

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
    }
  ]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: 'profile',
      name: 'Home',
      icon: <StoreMallDirectoryOutlinedIcon width={20} height={20} />,
      component: (
        <StorefrontLandingPage
          myProfile={myProfile}
          posts={posts}
          authUser={user}
          setCurrentTab={setCurrentTab}
        />
      )
    },
    {
      value: 'products',
      name: 'Products',
      icon: <LocalMallOutlinedIcon width={20} height={20} />,
      component: <StorefrontProducts />
    },

    {
      value: 'all-categories',
      name: 'All Categories',
      icon: <ListAltOutlinedIcon width={20} height={20} />,
      component: <StorefrontAllCategories posts={posts} />
    }
  ];

  return (
    <Page title="User: Profile | Minimal-UI">
      <RootStyle position="static">
        <ToolbarStyle>
          <Avatar
            sx={{ height: 100, width: 100, marginRight: theme.spacing(2) }}
          />
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              textAlign: { xs: 'center', md: 'left' },
              color: 'black'
            }}
          >
            <Typography variant="h4" color="black">
              displayName
            </Typography>
            <Typography sx={{ opacity: 0.72 }}>MYPLACE</Typography>
          </Box>
        </ToolbarStyle>
        <TabsWrapperStyle2>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.name}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle2>
      </RootStyle>
      <Container>
        <div className={classes.toolbar} />
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
// <Container
// sx={{
//   mb: 3,
//   height: 250,
//   position: 'relative',
//   display: 'flex',
//   justifyContent: 'space-between'
// }}
// >
// <StorefrontCover myProfile={myProfile} authUser={user} />

// <TabsWrapperStyle>
//   <Tabs
//     value={currentTab}
//     scrollButtons="auto"
//     variant="scrollable"
//     allowScrollButtonsMobile
//     onChange={handleChangeTab}
//   >
//     {PROFILE_TABS.map((tab) => (
//       <Tab
//         disableRipple
//         key={tab.value}
//         value={tab.value}
//         icon={tab.icon}
//         label={tab.name}
//       />
//     ))}
//   </Tabs>
// </TabsWrapperStyle>
// </Container>
