import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {
  alpha,
  makeStyles,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const ProductShipping = ({
  homeDeliveryDistance,
  setHomeDeliveryDistance,
  homeDeliveryPrice,
  setHomeDeliveryPrice,
  shippingPrice,
  setShippingPrice,
  shippingChecked,
  setShippingChecked,
  homeDeliveryChecked,
  setHomeDeliveryChecked,
  clickCollectChecked,
  setClickCollectChecked,
  freeShipping,
  setFreeShipping,
  freeHomeDelivery,
  setFreeHomeDelivery
}) => {
  const classes = useStyles();

  const onChangeClickCollectCard = () => {
    setClickCollectChecked((prev) => !prev);
  };

  const onChangeShippingCard = () => {
    setShippingChecked((prev) => !prev);
  };

  const onChangeHomeDeliveryCard = () => {
    setHomeDeliveryChecked((prev) => !prev);
  };

  const DocStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: shippingChecked
      ? theme.palette.primary.main
      : theme.palette.error.main
  }));

  return (
    <div
      className={{
        root: {
          flexGrow: 1,
          padding: 5,
          margin: 10
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography gutterBottom variant="h4">
          Fulfillment Options
        </Typography>
      </div>
      <Divider variant="middle" />

      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            border={2}
            borderRadius={2}
            borderColor={clickCollectChecked ? 'primary.light' : 'error.light'}
          >
            <CardActionArea>
              <CardContent>
                <div className={useStyles().iconDiv}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Click & Collect
                  </Typography>
                  {clickCollectChecked ? (
                    <BeenhereIcon color="primary" className={classes.icon} />
                  ) : (
                    <IndeterminateCheckBoxIcon
                      color="error"
                      className={classes.icon}
                    />
                  )}
                </div>
                <Divider />
                <br />

                <Typography variant="body2" color="textSecondary" component="p">
                  Click & Collect is always enabled by default
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                  Click & Collect is an option where customers can order online
                  and pick up their order in your store. When customers use this
                  option you have to make their order ready for pickup.
                </Typography>
                <br />
              </CardContent>
            </CardActionArea>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            border={2}
            borderRadius={2}
            borderColor={shippingChecked ? 'primary.light' : 'error.light'}
          >
            <CardActionArea onClick={onChangeShippingCard}>
              <CardContent>
                <div className={useStyles().iconDiv}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Shipping
                  </Typography>
                  {shippingChecked ? (
                    <BeenhereIcon color="primary" className={classes.icon} />
                  ) : (
                    <IndeterminateCheckBoxIcon
                      color="error"
                      className={classes.icon}
                    />
                  )}
                </div>
                <Divider />
                <br />

                <Typography variant="body2" color="textSecondary" component="p">
                  Enable Shipping and send your product as parcel to your
                  customers
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                  You have to arrange sending with your preffered shipping
                  courier (DHL, UPS, etc).
                </Typography>
                <br />
                {shippingChecked ? (
                  <div>
                    <Typography variant="subtitle1">
                      Click to Disable
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography variant="subtitle1">Click to Enable</Typography>
                  </div>
                )}
              </CardContent>
              <Divider />
            </CardActionArea>
            {shippingChecked ? (
              <CardContent>
                <CardHeader subheader="Set a price for shipping this product" />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  disabled={freeShipping}
                  required
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">NOK</InputAdornment>
                    )
                  }}
                  autoComplete="off"
                  name="defaultShippingPrice"
                  label="Shipping Price"
                  id="defaultShippingPrice"
                  onChange={(e) => setShippingPrice(e.target.value)}
                />
                <CardHeader subheader=" Or enable FREE shipping" />
                <CardContent
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle2" style={{ marginTop: 7 }}>
                    Free Shipping
                  </Typography>
                  <Switch
                    checked={freeShipping}
                    onChange={() => setFreeShipping(!freeShipping)}
                  />
                </CardContent>
              </CardContent>
            ) : (
              <div />
            )}
          </Box>
        </Grid>
      </Grid>
      <br />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  iconDiv: {
    display: 'flex'
  },

  icon: {
    marginTop: 5,
    marginLeft: 5
  },

  root: {
    flexGrow: 1,
    padding: 5,
    margin: 10
  }
}));

export default ProductShipping;

// <Grid item xs={12} md={4}>
// <Card>
//   <CardActionArea onClick={onChangeHomeDeliveryCard}>
//     <CardContent>
//       <div className={useStyles().iconDiv}>
//         <Typography gutterBottom variant="h5" component="h2">
//           Home Delivery
//         </Typography>
//         {homeDeliveryChecked ? (
//           <BeenhereIcon color="primary" className={classes.icon} />
//         ) : (
//           <BeenhereIcon color="error" className={classes.icon} />
//         )}
//       </div>
//       <Divider />
//       <br />

//       <Typography variant="body2" color="textSecondary" component="p">
//         Enable Home Delivery and customers in your area can schedule a
//         Home Delivery.
//       </Typography>
//       <br />
//       <Typography variant="body2" color="textSecondary" component="p">
//         You have to arrange Home Delivery yourself, either arrange
//         with a courier service or drive yourself.
//       </Typography>
//       <br />

//       {homeDeliveryChecked ? (
//         <div>
//           <Button variant="outlined" color="error">
//             Click to Disable
//           </Button>
//         </div>
//       ) : (
//         <div>
//           <Button variant="outlined" color="primary">
//             Click to Enable
//           </Button>
//         </div>
//       )}
//     </CardContent>
//   </CardActionArea>
//   <Divider />
//   {homeDeliveryChecked ? (
//     <CardContent>
//       <CardHeader subheader="Set a price for Home Delivery" />
//       <TextField
//         fullWidth
//         variant="outlined"
//         margin="normal"
//         disabled={!homeDeliveryChecked}
//         required
//         type="number"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">NOK</InputAdornment>
//           )
//         }}
//         autoComplete="off"
//         name="HomeDeliveryPrice"
//         label="Home Delivery Price"
//         id="HomeDeliveryPrice"
//         onChange={(e) => setHomeDeliveryPrice(e.target.value)}
//       />
//       <CardHeader subheader=" Or enable FREE Home Delivery" />
//       <CardContent
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between'
//         }}
//       >
//         <Typography variant="subtitle2" style={{ marginTop: 7 }}>
//           Free Home Delivery
//         </Typography>
//         <Switch
//           checked={freeHomeDelivery}
//           onChange={() => setFreeHomeDelivery(!freeHomeDelivery)}
//         />
//       </CardContent>
//     </CardContent>
//   ) : (
//     <div />
//   )}
// </Card>
// </Grid>
