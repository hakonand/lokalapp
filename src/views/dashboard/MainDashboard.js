// material
import { Container, Grid } from '@material-ui/core';
// components
import Page from '../../components/Page';
import EcommerceClickCollectOrders from './EcommerceClickCollectOrders';
import EcommerceReadyForSending from './EcommerceReadyForSending';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceTotalBalance,
  EcommerceSaleByGender,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
  EcommerceNewOrders,
  EcommerceNewsCarousel,
  NextFeature
} from './index';
import OrderList from '../OrderList/OrderList';
import EcommerceGetSupport from './EcommerceGetSupport';

// ----------------------------------------------------------------------

export default function MainDashboard() {
  return (
    <Page title="General: E-commerce | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewsCarousel />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewOrders />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceClickCollectOrders />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceReadyForSending />
          </Grid>
          <Grid item xs={12} md={12}>
            <OrderList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
