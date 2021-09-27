import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// material

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  DialogTitle,
  Avatar,
  Chip
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';

// routes
// components
import { DialogAnimate } from '../../components/animate';

import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import OrderListHead from './OrderListHead';
import OrderListToolbar from './OrderListToolbar';
import OrderModal from './OrderModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Order ID', alignRight: false },
  { id: 'orderStatus', label: 'Status', alignRight: false },
  { id: 'name', label: 'Buyer Name', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'fulfillmentType', label: 'Fulfillment type', alignRight: false },
  { id: 'price', label: 'Total price', alignRight: true }
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function OrderList() {
  const [orders, setOrders] = useState([
    {
      id: 'ab',
      name: 'name',
      price: '10',
      fulfillmentType: 'Click & Collect',
      createdAt: '02.02.2021',
      orderStatus: 'Unattended',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    },
    {
      id: 'cd',
      name: 'name1',
      price: '11',
      fulfillmentType: 'Shipping',
      createdAt: '01.01.2021',
      orderStatus: 'Follow Up',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    },
    {
      id: 'ef',
      name: 'name1',
      price: '11',
      fulfillmentType: 'Custom Shipping',
      createdAt: '01.01.2021',
      orderStatus: 'Ready',
      productArray: [
        {
          id: 1,
          productName: 'testName',
          productPrice: 12,
          productQty: 1,
          productTotal: 12
        },
        {
          id: 2,
          productName: 'Testname2',
          productPrice: 34,
          productQty: 2,
          productTotal: 68
        }
      ]
    }
  ]);

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  const [openOrderModal, setOpenOrderModal] = useState();
  const [modalName, setModalName] = useState();
  const [modalPrice, setModalPrice] = useState();
  const [modalFulfillmentType, setModalFulfillmentType] = useState();
  const [modalDate, setModalDate] = useState();
  const [modalId, setModalId] = useState();
  const [modalStatus, setModalStatus] = useState();
  const [modalProductArray, setModalProductArray] = useState([
    { id: 1, productName: 'TEST' }
  ]);

  const [modalProductName, setModalProductName] = useState();

  useEffect(() => {}, []);

  const handleDelete = async (index) => {
    try {
      const newArray = [...orders];
      newArray.splice(index, 1);
      setOrders(newArray);

      enqueueSnackbar('Order Deleted', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredProducts = applySortFilter(
    orders,
    getComparator(order, orderBy),
    filterName
  );

  const handleRowClick = (
    id,
    name,
    price,
    createdAt,
    fulfillmentType,
    orderStatus,
    productArray
  ) => {
    setModalName(name);
    setModalId(id);
    setModalPrice(price);
    setModalFulfillmentType(fulfillmentType);
    setModalDate(createdAt);
    setOpenOrderModal(!openOrderModal);
    setModalStatus(orderStatus);
    setModalProductArray(productArray);
    console.log(productArray);
    console.log(orders);
  };

  const isProductNotFound = orders.length === 0;

  const renderOrderStatusChip = (orderStatus) => {
    if (orderStatus === 'Ready') {
      return (
        <Chip
          label="Ready"
          icon={<BeenhereOutlinedIcon />}
          clickable
          color="primary"
        />
      );
    }
    if (orderStatus === 'Follow Up') {
      return (
        <Chip
          label="Follow Up"
          icon={<ErrorOutlineOutlinedIcon />}
          clickable
          color="info"
        />
      );
    }
    return (
      <Chip
        label="Unattended"
        icon={<ErrorOutlineOutlinedIcon />}
        clickable
        color="error"
      />
    );
  };

  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <OrderListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={orders.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    name,
                    cover,
                    price,
                    createdAt,
                    fulfillmentType,
                    orderStatus,
                    productArray
                  } = row;

                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      key={id}
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={() =>
                        handleRowClick(
                          id,
                          name,
                          price,
                          createdAt,
                          fulfillmentType,
                          orderStatus,
                          productArray
                        )
                      }
                    >
                      <TableCell>
                        <Typography>{id}</Typography>
                      </TableCell>
                      <TableCell>
                        {renderOrderStatusChip(orderStatus)}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ minWidth: 160 }}>
                        {createdAt}
                      </TableCell>

                      <TableCell style={{ minWidth: 160 }}>
                        {{
                          Shipping: (
                            <Chip
                              label="Shipping"
                              icon={<ErrorOutlineOutlinedIcon />}
                              clickable
                              variant="outlined"
                              color="info"
                            />
                          ),
                          'Click & Collect': (
                            <Chip
                              label="Click & collect"
                              variant="outlined"
                              icon={<ErrorOutlineOutlinedIcon />}
                              clickable
                              color="warning"
                            />
                          ),
                          'Custom Shipping': (
                            <Chip
                              label="Custom Shipping"
                              variant="outlined"
                              icon={<ErrorOutlineOutlinedIcon />}
                              clickable
                              color="success"
                            />
                          )
                        }[fulfillmentType] || (
                          <Chip
                            label={fulfillmentType}
                            variant="outlined"
                            icon={<ErrorOutlineOutlinedIcon />}
                            clickable
                            color="success"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">{fCurrency(price)}</TableCell>

                      <br />
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isProductNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <Box sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <DialogAnimate
        open={openOrderModal}
        onClose={() => setOpenOrderModal(!openOrderModal)}
      >
        <OrderModal
          modalName={modalName}
          modalPrice={modalPrice}
          modalFulfillmentType={modalFulfillmentType}
          modalDate={modalDate}
          modalId={modalId}
          orders={orders}
          setOrders={setOrders}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          modalProductArray={modalProductArray}
          handleDelete={handleDelete}
          setOpenOrderModal={setOpenOrderModal}
          openOrderModal={openOrderModal}
          onCancel={() => setOpenOrderModal(!openOrderModal)}
        />
      </DialogAnimate>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
