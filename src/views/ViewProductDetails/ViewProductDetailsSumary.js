import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useHistory } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Link,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
//
import { MIconButton, MButton } from '../../components/@material-extend';
import Label from '../../components/Label';
import ColorSinglePicker from '../../components/ColorSinglePicker';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },

  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

//     <Label
//        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
//       color={productInventoryType === 'in_stock' ? 'success' : 'error'}
//       sx={{ textTransform: 'uppercase' }}
//     >
//       {sentenceCase(productInventoryType)}
//    </Label>
//    <Typography
//      variant="overline"
//      sx={{
//        mt: 2,
//        mb: 1,
//        display: 'block',
//         color: productStatus === 'sale' ? 'error.main' : 'info.main'
//      }}
//    >
//      {productStatus}
//    </Typography>

// ----------------------------------------------------------------------

export default function ViewProductDetailsSumary({
  productName,
  productPrice,
  productColors,
  productSizes,
  productInventoryType,
  productStatus,
  productAvaiable,
  productOwner,
  productDescription,
  ...other
}) {
  const theme = useTheme();
  const history = useHistory();

  const [showMore, setShowMore] = useState(true);

  const handleAddCart = async () => {
    console.log('addcart');
  };
  const buyNow = () => {
    console.log('buy now');
  };

  const Incrementer = () => {
    // eslint-disable-next-line react/prop-types

    const incrementQuantity = () => {
      console.log('+1');
    };
    const decrementQuantity = () => {
      console.log('-1');
    };

    return (
      <Box
        sx={{
          py: 0.5,
          px: 0.75,
          border: 1,
          lineHeight: 0,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          borderColor: 'grey.50032'
        }}
      >
        <MIconButton
          size="small"
          color="inherit"
          disabled={!productAvaiable}
          onClick={decrementQuantity}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        <Typography
          variant="body2"
          component="span"
          sx={{
            width: 40,
            textAlign: 'center',
            display: 'inline-block'
          }}
        >
          1
        </Typography>
        <MIconButton
          size="small"
          color="inherit"
          disabled={!productAvaiable}
          onClick={incrementQuantity}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </Box>
    );
  };

  return (
    <RootStyle {...other}>
      <Typography variant="h5">{productName}</Typography>
      <Typography paragraph variant="overline" color="text.secondary">
        {productOwner}
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        <Box
          component="span"
          sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
        />
        {fCurrency(productPrice)}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        sx={{
          my: 3,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Color
        </Typography>
        <TextField
          select
          size="small"
          SelectProps={{ native: true }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
              margin: 0,
              mt: 1
            }
          }}
        >
          {productColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Size
        </Typography>
        <TextField
          select
          size="small"
          width="300"
          SelectProps={{ native: true }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
              margin: 0,
              mt: 1
            }
          }}
        >
          {productSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </TextField>
      </Box>
      <Box
        sx={{
          mb: 3
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Description
        </Typography>
        <br />
        {showMore ? (
          <div>
            {productDescription.substring(0, 100)} ...
            <Button
              type="text"
              color="secondary"
              onClick={() => setShowMore(!showMore)}
            >
              Read more
            </Button>
          </div>
        ) : (
          <div>
            {productDescription}
            <Button
              type="text"
              color="secondary"
              onClick={() => setShowMore(!showMore)}
            >
              Read less
            </Button>
          </div>
        )}
      </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer name="quantity" available={productAvaiable} />
          </div>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button fullWidth size="large" variant="outlined" onClick={buyNow}>
              Buy Now
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              startIcon={<Icon icon={roundAddShoppingCart} />}
              onClick={handleAddCart}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add to Cart
            </MButton>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <MIconButton>{social.icon}</MIconButton>
          </Tooltip>
        ))}
      </Box>
    </RootStyle>
  );
}
