import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import messageSquareOutline from '@iconify/icons-eva/message-square-outline';

// material
import { Box, Card, TextField, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import fakeRequest from '../../utils/fakeRequest';

// ----------------------------------------------------------------------

const SOCIAL_LINKS_OPTIONS = [
  {
    value: 'facebookLink',
    icon: <Icon icon={facebookFill} height={24} />
  },
  {
    value: 'instagramLink',
    icon: <Icon icon={instagramFilled} height={24} />
  },
  {
    value: 'messengerLink',
    icon: <Icon icon={messageSquareOutline} height={24} />
  },
  {
    value: 'twitterLink',
    icon: <Icon icon={twitterFill} height={24} />
  }
];

// ----------------------------------------------------------------------

AccountSocialLinks.propTypes = {
  myProfile: PropTypes.object,
  sx: PropTypes.object
};

export default function AccountSocialLinks({
  myProfile,
  sx,
  facebookLink,
  instagramLink,
  messengerLink,
  setFacebookLink,
  setInstagramLink,
  makeChange,
  setMakeChange,
  setMessengerLink
}) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card sx={{ p: 3, ...sx }}>
      <TextField
        disabled={!makeChange}
        fullWidth
        label="Facebook"
        value={facebookLink}
        onChange={(e) => setFacebookLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon={facebookFill} height={24} />
            </InputAdornment>
          )
        }}
        sx={{ mb: 3 }}
      />
      <TextField
        disabled={!makeChange}
        fullWidth
        label="Messenger"
        value={messengerLink}
        onChange={(e) => setMessengerLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon={messageSquareOutline} height={24} />
            </InputAdornment>
          )
        }}
        sx={{ mb: 3 }}
      />
      <TextField
        disabled={!makeChange}
        fullWidth
        label="Instagram"
        value={instagramLink}
        onChange={(e) => setInstagramLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon={instagramFilled} height={24} />
            </InputAdornment>
          )
        }}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {makeChange ? (
          <LoadingButton
            variant="contained"
            onClick={() => setMakeChange(!makeChange)}
          >
            Save Changes
          </LoadingButton>
        ) : (
          <LoadingButton
            color="info"
            variant="contained"
            onClick={() => setMakeChange(!makeChange)}
          >
            Make Change
          </LoadingButton>
        )}
      </Box>
    </Card>
  );
}
