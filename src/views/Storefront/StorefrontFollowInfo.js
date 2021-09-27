import PropTypes from 'prop-types';
// material
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';
// utils
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

StorefrontFollowInfo.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function StorefrontFollowInfo({ profile, sx, ...other }) {
  const { follower, following } = profile;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(follower)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Follower
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(following)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Following
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
