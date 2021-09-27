import PropTypes from 'prop-types';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Icon, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 30,
  height: 30,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(6)
}));

// ----------------------------------------------------------------------

StorefrontSocialInfo.propTypes = {
  profile: PropTypes.object
};

export default function StorefrontSocialInfo({ profile, ...other }) {
  const { facebookLink, instagramLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: 'Facebook',
      icon: (
        <FacebookIcon
          color="black"
          style={{
            width: 30,
            height: 30,
            flexShrink: 0,
            marginRight: 15,
            marginLeft: 15
          }}
        />
      ),
      href: facebookLink
    },
    {
      name: 'Instagram',
      icon: (
        <InstagramIcon
          color="black"
          style={{
            width: 30,
            height: 30,
            flexShrink: 0,
            marginRight: 15,
            marginLeft: 15
          }}
        />
      ),
      href: instagramLink
    },
    {
      name: 'Twitter',
      icon: (
        <TwitterIcon
          color="black"
          style={{
            width: 30,
            height: 30,
            flexShrink: 0,
            marginRight: 10,
            marginLeft: 15
          }}
        />
      ),
      href: twitterLink
    }
  ];

  return (
    <div
      style={{
        flexDirection: 'row',
        display: 'flex'
      }}
    >
      <ArrowForwardIosIcon
        style={{
          width: 20,
          height: 20,
          marginTop: 15,
          flexShrink: 0
        }}
      />
      {SOCIALS.map((link) => (
        <Box
          key={link.name}
          sx={{
            display: 'flex'
          }}
        >
          <IconButton color="secondary" noWrap>
            {link.icon}
          </IconButton>
        </Box>
      ))}
    </div>
  );
}
