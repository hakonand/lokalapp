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
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  Container,
  Grid,
  Typography,
  CardHeader,
  CardActionArea,
  CardContent
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
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

AccountBonusProgram.propTypes = {
  myProfile: PropTypes.object,
  sx: PropTypes.object
};

export default function AccountBonusProgram({
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
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardActionArea>
              <CardHeader variant="h6" title="Reccurring Purchase" />
              <CardContent>
                <Typography component="p" variant="body2">
                  sadsada NOK
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// <Grid item xs={12} sm={6} md={6}>
//   <Card>
//     <CardActionArea>
//       <CardHeader variant="h6" title="Order Value" />
//       <CardContent>
//         <Typography component="p" variant="body2">
//           sadsada NOK
//         </Typography>
//       </CardContent>
//     </CardActionArea>
//   </Card>
// </Grid>
