import { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
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
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

import { TimePicker } from '@material-ui/pickers';

import { LoadingButton, MobileDateTimePicker } from '@material-ui/lab';
// redux
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../redux/slices/calendar';
//
import ColorSinglePicker from '../../components/ColorSinglePicker';
import firebase from '../../firebase/firebase';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#1890FF', // theme.palette.info.main,
  '#00AB55', // theme.palette.primary.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
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

RecurringEventForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default function RecurringEventForm({
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
  setOpenEventModal,
  setNewDaysOfWeek,
  newDaysofWeek
}) {
  const { enqueueSnackbar } = useSnackbar();
  const isCreating = !event;

  const [checkedMonday, setCheckedMonday] = useState();
  const [checkedTuesday, setCheckedTuesday] = useState();
  const [checkedWednesday, setCheckedWednesday] = useState();
  const [checkedThursday, setCheckedThursday] = useState();
  const [checkedFriday, setCheckedFriday] = useState();
  const [checkedSaturday, setCheckedSaturday] = useState();
  const [checkedSunday, setCheckedSunday] = useState();

  const onSubmit = async () => {
    try {
      const newEvent = {
        daysOfWeek: newDaysofWeek,
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

      firebase
        .firestore()
        .collection('merchants')
        .doc('merchantID')
        .collection('general')
        .doc()
        .set({ events })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

      setOpenEventModal(!openEventModal);
      console.log(events);
      enqueueSnackbar('Recurring event created', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed creating event. Try again', { variant: 'error' });
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

  const onCheckMonday = () => {
    if (checkedMonday > 0) {
      setCheckedMonday(null);
    } else {
      setCheckedMonday(1);
    }
    console.log(checkedMonday);
  };

  const onCheckTuesday = () => {
    if (checkedTuesday > 0) {
      setCheckedTuesday(null);
    } else {
      setCheckedTuesday(2);
    }
    console.log(checkedTuesday);
  };
  const onCheckWednesday = () => {
    if (checkedWednesday > 0) {
      setCheckedWednesday(null);
    } else {
      setCheckedWednesday(3);
    }
    console.log(checkedWednesday);
  };
  const onCheckThursday = () => {
    if (checkedThursday > 0) {
      setCheckedThursday(null);
    } else {
      setCheckedThursday(4);
    }
    console.log(checkedThursday);
  };

  const onCheckFriday = () => {
    if (checkedFriday > 0) {
      setCheckedFriday(null);
    } else {
      setCheckedFriday(5);
    }
    console.log(checkedFriday);
  };
  const onCheckSaturday = () => {
    if (checkedSaturday > 0) {
      setCheckedSaturday(null);
    } else {
      setCheckedSaturday(6);
    }
    console.log(checkedSaturday);
  };
  const onCheckSunday = () => {
    if (checkedSunday >= 0) {
      setCheckedSunday(null);
    } else {
      setCheckedSunday(0);
    }
    console.log(checkedSunday);
  };
  /* eslint prefer-arrow-callback: 0 */

  useEffect(() => {
    setNewDaysOfWeek([
      checkedMonday,
      checkedTuesday,
      checkedWednesday,
      checkedThursday,
      checkedFriday,
      checkedSaturday,
      checkedSunday
    ]);
  }, [
    checkedMonday,
    checkedTuesday,
    checkedWednesday,
    checkedThursday,
    checkedFriday,
    checkedSaturday,
    checkedSunday
  ]);

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
            <Checkbox
              checked={checkedMonday}
              onChange={onCheckMonday}
              name="checkedA"
              color="primary"
            />
          }
          label="Monday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedTuesday}
              onChange={onCheckTuesday}
              name="checkedB"
              color="primary"
            />
          }
          label="Tuesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedWednesday}
              onChange={onCheckWednesday}
              name="checkedC"
              color="primary"
            />
          }
          label="Wednesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedThursday}
              onChange={onCheckThursday}
              name="checkedD"
              color="primary"
            />
          }
          label="Thursday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedFriday}
              onChange={onCheckFriday}
              name="checkedE"
              color="primary"
            />
          }
          label="Friday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSaturday}
              onChange={onCheckSaturday}
              name="checkedF"
              color="primary"
            />
          }
          label="Saturday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSunday}
              onChange={onCheckSunday}
              name="checkedG"
              color="primary"
            />
          }
          label="Sunday"
        />
        <br />
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
        <TimePicker
          autoOk
          ampm={false}
          value={newEventStartDate}
          onChange={(e) => setNewEventStartDate(e)}
          label="Start"
          sx={{ mb: 3 }}
        />
        <br />
        <TimePicker
          autoOk
          ampm={false}
          value={newEventEndDate}
          onChange={(e) => setNewEventEndDate(e)}
          label="End"
          sx={{ mb: 3 }}
        />
        <br />

        <ColorSinglePicker
          value={newEventColor}
          onChange={(event) => setNewEventColor(event.target.value)}
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
          onClick={onSubmit}
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
