import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  CardContent,
  CardActionArea
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
//

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function ViewProductCards({ product }) {
  const IconStyle = styled('div')(({ theme }) => ({
    marginLeft: -4,
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: `solid 2px ${theme.palette.background.paper}`,
    boxShadow: `inset -1px 1px 2px (theme.palette.common.black, 0.24)`
  }));

  const RootStyle = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  });

  return (
    <Card>
      <Link
        to={`${PATH_DASHBOARD.eCommerce.root}/username/product/testproduct`}
        color="inherit"
        component={RouterLink}
      >
        <CardActionArea>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <ProductImgStyle alt={product.name} src={product.cover} />
          </Box>
          <CardContent>
            <Typography variant="body1" noWrap>
              {product.name}
            </Typography>

            <Typography variant="body2" noWrap>
              {product.price} NOK
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

//  <RootStyle component="span" {...other}>
// <IconStyle sx={{ bgcolor: 'black' }} />
// <IconStyle sx={{ bgcolor: 'green' }} />
// <IconStyle sx={{ bgcolor: 'lightgreen' }} />

// {colors.length > 3 && (
//  <Typography variant="subtitle2">+</Typography>
// )}
// </RootStyle>
