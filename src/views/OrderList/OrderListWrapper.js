import { Box, Card, Container } from '@material-ui/core';

import OrderList from './OrderList';
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function OrderListWrapper() {
  return (
    <Page title="Ecommerce: Product List | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Order List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.maindashboard },
            { name: 'Order List' }
          ]}
        />
        <OrderList />
      </Container>
    </Page>
  );
}
