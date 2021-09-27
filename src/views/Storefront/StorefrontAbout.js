import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
import clockOutline from '@iconify/icons-eva/clock-outline';
import messageSquareOutline from '@iconify/icons-eva/message-square-outline';
import emailOutline from '@iconify/icons-eva/email-outline';

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Button
} from '@material-ui/core';

// ----------------------------------------------------------------------
import StorefrontSocialInfo from './StorefrontSocialInfo';

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

const IconStyleContact = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 10,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

StorefrontAbout.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function StorefrontAbout({ profile, sx }) {
  const { quote, country, email, role, company, school } = profile;

  return (
    <>
      <Card sx={{ mb: 3, ...sx }}>
        <CardHeader title="About" />

        <CardContent>
          <Typography variant="body2">{quote}</Typography>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <IconStyle icon={pinFill} />
            <Typography variant="body2">
              Address , City,{' '}
              <Link component="span" variant="subtitle2" color="text.primary">
                {country}
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <IconStyle icon={clockOutline} />
            <Typography variant="body2">Opening Hours</Typography>
          </Box>

          <Typography variant="subtitle1" style={{ marginTop: 15 }}>
            Contact us
          </Typography>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <IconStyleContact icon={messageSquareOutline} />
            <Button variant="text" color="secondary">
              Facebook Messenger
            </Button>
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <IconStyleContact icon={emailOutline} />
            <Button variant="text" color="secondary">
              Email@email.com
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
