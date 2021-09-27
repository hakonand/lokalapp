import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundViewDay from '@iconify/icons-ic/round-view-day';
import roundViewWeek from '@iconify/icons-ic/round-view-week';
import roundViewAgenda from '@iconify/icons-ic/round-view-agenda';
import roundViewModule from '@iconify/icons-ic/round-view-module';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Hidden,
  Tooltip,
  Typography,
  IconButton,
  ToggleButton
} from '@material-ui/core';
// utils
import { fDate } from '../../utils/formatTime';
//
import { MButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'listWeek', label: 'This Week', icon: roundViewAgenda },
  { value: 'dayGridMonth', label: 'This Month', icon: roundViewModule }
];

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: theme.spacing(1.75, 3),
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

CalendarToolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
  onChangeView: PropTypes.func,
  view: PropTypes.oneOf([
    'dayGridMonth',
    'timeGridWeek',
    'timeGridDay',
    'listWeek'
  ])
};

export default function CalendarToolbar({
  date,
  view,
  onNextDate,
  onPrevDate,
  onToday,
  onChangeView,
  ...other
}) {
  return (
    <RootStyle {...other}>
      <Hidden smDown>
        <Box sx={{ '& > *:not(:last-of-type)': { mr: 1 } }}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0 }}
              >
                <Icon icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Box>
      </Hidden>

      <Typography variant="h5" sx={{ my: { xs: 1, sm: 0 } }}>
        {fDate(date)}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onPrevDate}>
          <Icon icon={arrowIosBackFill} width={18} height={18} />
        </IconButton>

        <MButton
          size="small"
          color="error"
          variant="contained"
          onClick={onToday}
          sx={{ mx: 0.5 }}
        >
          Today
        </MButton>

        <IconButton onClick={onNextDate}>
          <Icon icon={arrowIosForwardFill} width={18} height={18} />
        </IconButton>
      </Box>
    </RootStyle>
  );
}
