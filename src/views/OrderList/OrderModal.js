import { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';

import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';

import { useSnackbar } from 'notistack';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import PersonIcon from '@material-ui/icons/Person';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';

import DateRangeIcon from '@material-ui/icons/DateRange';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControlLabel,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListSubheader,
  List,
  Divider,
  ListItem,
  ListItemText,
  DialogContentText,
  Chip,
  Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { LoadingButton } from '@material-ui/lab';

// utils
import { fCurrency } from '../../utils/formatNumber';
import { DialogAnimate } from '../../components/animate';
import { fDate } from '../../utils/formatTime';

//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function OrderModal({
  modalName,
  modalPrice,
  modalFulfillmentType,
  modalDate,
  modalId,
  modalStatus,
  handleDelete,
  openOrderModal,
  setModalStatus,
  modalProductArray,
  setOpenOrderModal,
  orders,
  setOrders
}) {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [verifyModalId, setVerifyModalId] = useState('');

  const [customerInfoCollapse, setCustomerInfoCollapse] = useState(false);

  const [disableButton, setDisableButton] = useState(true);

  const [subtotal, setSubtotal] = useState(5);

  const [openOptions, setOpenOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const TAX_RATE = 0.25;

  const ccyFormat = (num) => `${num.toFixed(2)}`;

  /* eslint prefer-arrow-callback: 0 */

  const subtotalEquate = () => {
    const subtotalCount = modalProductArray.reduce(function (prev, cur) {
      return prev + cur.productTotal;
    }, 0);

    setSubtotal(subtotalCount);
  };

  const taxesSum = TAX_RATE * subtotal;
  const totalSum = taxesSum + subtotal;

  useEffect(() => {
    verifyID();
    subtotalEquate();
  }, [verifyModalId]);

  const handleDeletePlus = () => {
    setOpenDeleteModal(!openDeleteModal);
    setOpenOrderModal(!openOrderModal);
    handleDelete();
  };

  const verifyID = () => {
    if (modalId === verifyModalId) {
      console.log('yeeet');
      setDisableButton(false);
    } else setDisableButton(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const consoleStatus = () => {
    console.log('Changed Status');
  };

  const changeOrderField = (newParam, newValue) => {
    const myIndex = orders.findIndex((x) => x.id === modalId);
    console.log(myIndex);
    if (myIndex >= 0) {
      const newArray = [...orders];
      newArray[myIndex][newParam] = newValue;
      setOrders(newArray);

      switch (newParam) {
        case 'orderStatus':
          return setModalStatus(newValue);
        default:
          console.log('Re-check what change is made to orders');
      }
    } else console.log('no index');
  };

  return (
    <div>
      <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
        <DialogTitle>
          <Typography variant="h6">Order Id: {modalId}</Typography>

          <div>
            <IconButton
              onClick={handleOpenMenu}
              id="simple-menu1"
              style={{
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(5)
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              keepMounted
              anchorEl={anchorEl}
              open={anchorEl}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => changeOrderField('orderStatus', 'Follow Up')}
              >
                Mark as Follow Up
              </MenuItem>
            </Menu>
          </div>
        </DialogTitle>

        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {{
                Ready: (
                  <Chip
                    label={modalStatus}
                    icon={<BeenhereOutlinedIcon />}
                    clickable
                    color="primary"
                  />
                ),
                Unattended: (
                  <Chip
                    label={modalStatus}
                    icon={<ErrorOutlineOutlinedIcon />}
                    clickable
                    color="error"
                  />
                ),
                'Follow Up': (
                  <Chip
                    label={modalStatus}
                    icon={<ErrorOutlineOutlinedIcon />}
                    clickable
                    color="info"
                  />
                )
              }[modalStatus] || (
                <Chip
                  label={modalStatus}
                  icon={<ErrorOutlineOutlinedIcon />}
                  clickable
                  color="grey"
                />
              )}
            </ListItemAvatar>
            <ListItemAvatar>
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
              }[modalFulfillmentType] || (
                <Chip
                  label={modalFulfillmentType}
                  variant="outlined"
                  icon={<ErrorOutlineOutlinedIcon />}
                  clickable
                  color="success"
                />
              )}
            </ListItemAvatar>
          </ListItem>
          <ListItem>
            <ListItemText>
              <DateRangeIcon />
            </ListItemText>
            <ListItemText>{modalDate}</ListItemText>
          </ListItem>
          <ListItem
            divider
            alignItems="space-between"
            onClick={() => setCustomerInfoCollapse(!customerInfoCollapse)}
          >
            <ListItemText>
              <PersonIcon />
            </ListItemText>
            <ListItemText primary={modalName} />
            {customerInfoCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={customerInfoCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText primary="+47 90549661" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Hellmyrbruddet 18b" />
              </ListItem>
              <ListItem divider>
                <ListItemText primary="8011" />

                <ListItemText primary="Bodø" />

                <ListItemText primary="Norge" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <TableContainer>
          <Table
            className={{ flexGrow: 1, minWidth: 600 }}
            aria-label="Products"
          >
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modalProductArray.map((product) => (
                <TableRow key={product.productName}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell align="right">{product.productQty}</TableCell>
                  <TableCell align="right">{product.productPrice}</TableCell>
                  <TableCell align="right">
                    {fCurrency(product.productTotal)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{fCurrency(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{TAX_RATE * 100}%</TableCell>
                <TableCell align="right">{fCurrency(taxesSum)}</TableCell>
              </TableRow>
              <TableRow variant="head">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{fCurrency(totalSum)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />
      </DialogContent>

      <DialogActions>
        <Tooltip title="Delete Order">
          <IconButton onClick={() => setOpenDeleteModal(!openDeleteModal)}>
            <Icon icon={trash2Fill} width={20} height={20} />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          onClick={() => setOpenOrderModal(!openOrderModal)}
        >
          Go Back
        </Button>
        {modalStatus === 'Ready' ? (
          <LoadingButton
            variant="contained"
            pendingIndicator="Loading..."
            color="primary"
            disabled
          >
            Ready
          </LoadingButton>
        ) : (
          <Tooltip title="Mark as Ready & Notify Customer">
            <LoadingButton
              onClick={() => changeOrderField('orderStatus', 'Ready')}
              variant="contained"
              pendingIndicator="Loading..."
              color="primary"
            >
              Mark as Ready
            </LoadingButton>
          </Tooltip>
        )}
      </DialogActions>

      <DialogAnimate
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <DialogTitle>Confirm Deleting</DialogTitle>
        <DialogTitle>Order Id :{modalId}</DialogTitle>

        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <Typography>Write the Order Id below and click "Delete"</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            value={verifyModalId}
            name="Order Id"
            label="Order Id"
            id="verifyModalId"
            onChange={(e) => setVerifyModalId(e.target.value)}
          />

          <br />
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Go Back
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Button
            type="button"
            variant="contained"
            disabled={disableButton}
            color="error"
            onClick={handleDeletePlus}
          >
            DELETE ORDER
          </Button>
        </DialogActions>
      </DialogAnimate>
    </div>
  );
}
