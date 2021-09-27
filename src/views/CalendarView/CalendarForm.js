import FormControl from '@material-ui/core/FormControl';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import {
  Box,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';

import { DateTimePicker } from '@material-ui/pickers';

import { LoadingButton, MobileDateTimePicker } from '@material-ui/lab';

//
import ColorSinglePicker from '../../components/ColorSinglePicker';
import firebase from '../../firebase/firebase';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#FFC107', // theme.palette.warning.main,
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default function CalendarForm({
  event,
  range,
  onCancel,
  newEventStartDate,
  setNewEventStartDate,
  setNewEventEndDate,
  newEventEndDate,
  newEventTitle,
  setNewEventTitle,
  setNewEventDescription,
  newEventDescription,
  newEventAllDay,
  setNewEventAllDay,
  setNewEventColor,
  newEventColor,
  setEvents,
  events,
  openEventModal,
  setOpenEventModal
}) {
  const { enqueueSnackbar } = useSnackbar();
  const isCreating = !event;

  const createEvent = async () => {
    try {
      const newEvent = {
        title: newEventTitle,
        description: newEventDescription,
        textColor: newEventColor,
        allDay: newEventAllDay,
        start: newEventStartDate,
        end: newEventEndDate
      };
      if (events) {
        const newArray = [...events, newEvent];

        setEvents(newArray);
      } else {
        const newArray = [newEvent];
        setEvents(newArray);
      }

      setOpenEventModal(!openEventModal);
      console.log(events);
      enqueueSnackbar('Event created', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Event error', { variant: 'error' });
    }
  };

  const handleDelete = async (index) => {
    try {
      onCancel();

      const newArray = [...events];
      newArray.splice(index, 1);
      setEvents(newArray);

      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormControl autoComplete="off" noValidate>
      <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
        <TextField
          fullWidth
          label="Title"
          onChange={(event) => setNewEventTitle(event.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          multiline
          onChange={(event) => setNewEventDescription(event.target.value)}
          maxRows={4}
          label="Description"
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              value={newEventAllDay}
              onChange={() => setNewEventAllDay(!newEventAllDay)}
            />
          }
          label="All day"
          sx={{ mb: 3 }}
        />
        <br />
        <DateTimePicker
          autoOk
          clearable
          ampm={false}
          value={newEventStartDate}
          onChange={(e) => setNewEventStartDate(e)}
          label="Start"
          sx={{ mb: 3 }}
        />
        <br />
        <DateTimePicker
          autoOk
          clearable
          ampm={false}
          value={newEventEndDate}
          onChange={(e) => setNewEventEndDate(e)}
          label="End"
          sx={{ mb: 3 }}
        />
        <br />

        <ColorSinglePicker
          value={newEventColor}
          onChange={(e) => setNewEventColor(e)}
          colors={COLOR_OPTIONS}
        />
      </DialogContent>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Icon icon={trash2Fill} width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={createEvent}
          variant="contained"
          pendingIndicator="Loading..."
        >
          Add
        </LoadingButton>
      </DialogActions>
    </FormControl>
  );
}

// <MobileDateTimePicker
//   label="Start date"
//   value={values.start}
//   inputFormat="dd/MM/yyyy hh:mm "
//   type="datetime-local"
//   ampm={false}
//   onChange={(date) => setFieldValue('start', date)}
//   renderInput={(params) => (
//     <TextField {...params} fullWidth sx={{ mb: 3 }} />
//   )}
// />

// <MobileDateTimePicker
//             label="End date"
//             value={values.end}
//             inputFormat="dd/MM/yyyy hh:mm "
//             type="datetime-local"
//             ampm={false}
//             onChange={(date) => setFieldValue('end', date)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 fullWidth
//                 ampm={false}
//                 error={Boolean(touched.end && errors.end)}
//                 helperText={touched.end && errors.end}
//                 sx={{ mb: 3 }}
//               />
//             )}
//           />
