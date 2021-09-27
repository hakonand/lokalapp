import FullCalendar, { flexibleCompare } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';

import {
  Card,
  Button,
  Container,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  Typography
} from '@material-ui/core';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderDashboard from '../../components/HeaderDashboard';
import CalendarForm from './CalendarForm';
import CalendarStyle from './CalendarStyle';
import CalendarToolbar from './CalendarToolbar';
import { fDateTime } from '../../utils/formatTime';
import RecurringEventForm from './RecurringEventForm';
import firebase from '../../firebase/firebase';

// ----------------------------------------------------------------------

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export default function Calendar() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? 'listWeek' : 'dayGridMonth');
  const selectedEvent = useSelector(selectedEventSelector);
  const { isOpenModal, selectedRange } = useSelector((state) => state.calendar);

  const [events, setEvents] = useState([]);
  // ---------------------------------------------------------

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventAllDay, setNewEventAllDay] = useState(false);
  const [newEventColor, setNewEventColor] = useState('#00AB55');

  const [newEventStartDate, setNewEventStartDate] = useState();
  const [newEventEndDate, setNewEventEndDate] = useState();

  const [selectedEventId, setSelectedEventId] = useState([]);

  const [openEventModal, setOpenEventModal] = useState(false);
  const [selectRange, setSelectRange] = useState();

  // ---------------------------------------------------------

  const [openRecurringEvent, setOpenRecurringEvent] = useState(false);
  const [newDaysofWeek, setNewDaysOfWeek] = useState([]);

  // ---------------------------------------------------------

  const [openViewEvent, setOpenViewEvent] = useState(false);

  const [viewEventTitle, setViewEventTitle] = useState('');
  const [viewEventDescription, setViewEventDescription] = useState('');

  const [viewEventStartDate, setViewEventStartDate] = useState();
  const [viewEventEndDate, setViewEventEndDate] = useState();

  // ---------------------------------------------------------

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await firebase
          .firestore()
          .collection('merchants')
          .doc('merchantID')
          .collection('general')
          .doc('test')
          .get();

        console.log('response', response);

        let data = { title: 'not found' };

        if (response.exists) {
          data = response.data();
        }

        setEvents([data]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('merchants')
      .doc('merchantID')
      .collection('general')
      .doc('calendar')
      .set({ ...events })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }, [events]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // ---------------------------------------------------------

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    setSelectRange(arg.start, arg.end);
  };

  const handleSelectEvent = (info) => {
    console.log(info.event);

    setOpenViewEvent(!openViewEvent);
    setViewEventTitle(info.event.title);
    setViewEventDescription(info.event.extendedProps.description);

    if (info.event.start) {
      setViewEventStartDate(fDateTime(info.event.start));
    } else {
      setViewEventStartDate('No Start date');
    }

    if (info.event.end) {
      setViewEventEndDate(fDateTime(info.event.end));
    } else {
      setViewEventEndDate('No End date');
    }
  };

  const handleCloseViewEventModal = () => {
    setOpenViewEvent(!openViewEvent);
    setViewEventTitle();
    setViewEventDescription();

    setViewEventStartDate();

    setViewEventEndDate();
  };

  const handleCloseRecurringEventModal = () => {
    setOpenRecurringEvent(!openRecurringEvent);
    setNewEventTitle();
    setNewEventDescription();

    setNewEventStartDate();
    setNewEventEndDate();
    setNewEventAllDay(false);
  };

  const handleCloseModal = () => {
    setOpenEventModal(false);
    setNewEventDescription('');
    setNewEventTitle('');
    setNewEventStartDate('');
    setNewEventEndDate('');
  };

  const handleOpenRecurringEvent = () => {
    setOpenRecurringEvent(!openRecurringEvent);
    setNewEventColor('#1890FF');
  };

  const handleOpenNewEvent = () => {
    setOpenEventModal(!openEventModal);
    setNewEventColor('#FFC107');
  };

  const deleteEventFromArray = (index) => {
    const newArray = [...events];
    newArray.splice(index, 1);
    setEvents(newArray);
    handleCloseViewEventModal();
    enqueueSnackbar('Event deleted', { variant: 'error' });
  };

  return (
    <Page title="Calendar | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Calendar"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.maindashboard },
            { name: 'Calendar' }
          ]}
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <div>
              <Button
                variant="contained"
                color="warning"
                style={{ margin: 10 }}
                startIcon={<Icon icon={plusFill} width={20} height={20} />}
                onClick={handleOpenNewEvent}
              >
                New Event
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Icon icon={plusFill} width={20} height={20} />}
                onClick={handleOpenRecurringEvent}
                style={{ margin: 10 }}
              >
                New Recurring Event
              </Button>
            </div>
            <FullCalendar
              firstDay={1}
              titleFormat={{
                hour12: false,
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit'
              }}
              weekends
              editable
              droppable
              selectable
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: false,
                hour12: false
              }}
              events={events}
              slotlabelformat="HH:mm"
              ref={calendarRef}
              rerenderDelay={2}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventClick={handleSelectEvent}
              height={isMobile ? 'auto' : 720}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin
              ]}
            />
          </CalendarStyle>
        </Card>

        <DialogAnimate open={openEventModal} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedEvent ? 'Edit Event' : 'Add Event'}
          </DialogTitle>
          <CalendarForm
            event={selectedEvent}
            range={selectedRange}
            newEventStartDate={newEventStartDate}
            setNewEventStartDate={setNewEventStartDate}
            newEventEndDate={newEventEndDate}
            setNewEventEndDate={setNewEventEndDate}
            newEventTitle={newEventTitle}
            setNewEventTitle={setNewEventTitle}
            setNewEventDescription={setNewEventDescription}
            newEventDescription={newEventDescription}
            newEventAllDay={newEventAllDay}
            setNewEventAllDay={setNewEventAllDay}
            setNewEventColor={setNewEventColor}
            newEventColor={newEventColor}
            events={events}
            setEvents={setEvents}
            setOpenEventModal={setOpenEventModal}
            openEventModal={openEventModal}
            onCancel={() => setOpenEventModal(!openEventModal)}
          />
        </DialogAnimate>

        <DialogAnimate
          open={openRecurringEvent}
          onClose={handleCloseRecurringEventModal}
        >
          <DialogTitle>Add Recurring Event</DialogTitle>
          <RecurringEventForm
            setOpenEventModal={setOpenRecurringEvent}
            openEventModal={openRecurringEvent}
            newEventStartDate={newEventStartDate}
            setNewEventStartDate={setNewEventStartDate}
            newEventEndDate={newEventEndDate}
            setNewEventEndDate={setNewEventEndDate}
            newEventTitle={newEventTitle}
            setNewEventTitle={setNewEventTitle}
            setNewEventDescription={setNewEventDescription}
            newEventDescription={newEventDescription}
            newEventAllDay={newEventAllDay}
            setNewEventAllDay={setNewEventAllDay}
            setNewEventColor={setNewEventColor}
            newEventColor={newEventColor}
            events={events}
            newDaysofWeek={newDaysofWeek}
            setNewDaysOfWeek={setNewDaysOfWeek}
            setEvents={setEvents}
            onCancel={() => setOpenRecurringEvent(!openRecurringEvent)}
          />
        </DialogAnimate>

        <DialogAnimate open={openViewEvent} onClose={handleCloseViewEventModal}>
          <DialogTitle>{viewEventTitle}</DialogTitle>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <DialogContent>
              <Typography display="inline-block" gutterBottom>
                {viewEventDescription}
              </Typography>
              <br />
              <Typography>
                {viewEventStartDate} - {viewEventEndDate}
              </Typography>
              <br />
              <Button
                onClick={deleteEventFromArray}
                variant="outlined"
                color="error"
              >
                Delete Event
              </Button>
            </DialogContent>
          </div>
          <br />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
