import { Link as RouterLink } from 'react-router-dom';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Typography, Button, Box, Card, CardContent } from '@material-ui/core';
import { PATH_DOCS } from '../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('xl')]: { height: 320 }
}));

// ----------------------------------------------------------------------

export default function EcommerceGetSupport() {
  const theme = useTheme();

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          sx={{ color: 'grey.800', marginTop: theme.spacing(5) }}
        >
          Need help?
          <br /> Have some feedback?
        </Typography>

        <Typography variant="body1">
          Please dont hesitate to contact us.{' '}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 },
            paddingRight: theme.spacing(1)
          }}
        >
          <br /> We would love to be a sparring partner for your ecommerce
          actions.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 },
            paddingRight: theme.spacing(1)
          }}
        >
          If you have some feedback for our product please dont hesitate to let
          us know. We would greatly appreciate it.{' '}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 },
            paddingRight: theme.spacing(1)
          }}
        >
          You can reach us by clicking this button
        </Typography>
        <Button to={PATH_DOCS.root} variant="contained" component={RouterLink}>
          Contact Us
        </Button>
      </CardContent>
    </RootStyle>
  );
}

// <Box
// component="img"
// alt="welcome"
// src="/static/illustrations/illustration_motivation.svg"
// sx={{
//   p: 2,
//   height: 280,
//   margin: { xs: 'auto', md: 'inherit' }
// }}
// />
