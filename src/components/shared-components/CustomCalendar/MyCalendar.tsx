import React from 'react';
import { Calendar, CalendarProps, EventWrapperProps } from 'react-big-calendar';
import { useDialog } from '@/hooks/useDialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventSlotDialogForm from './EventSlotDialogForm';
import EventSlotDetails from './EventSlotDetails';
import { useAddEvent, useGetEvents } from '@/hooks/newsAndEvents';
import type { EventType } from 'types/EventTypes';

interface MyCalendarProps extends CalendarProps<EventType> {
  myEvents: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}

type CustomEventWrapperProps = EventWrapperProps<EventType> & {
  children?: React.ReactNode;
};

export default function MyCalendar({
  myEvents,
  setEvents,
  localizer
}: MyCalendarProps) {
  const { data: newsAndEvents } = useGetEvents();
  // @ts-ignore
  const transformedNewsEvents = newsAndEvents?.map(value => {
    return { title: value.name, start: value.startingAT, end: value.endingAT };
  });

  const {
    isDialogOpen: isSlotDialogOpen,
    closeDialog: closeSlotDialog,
    openDialog: openSlotDialog
  } = useDialog();
  const {
    isDialogOpen: isSelectedEventDialogOpen,
    closeDialog: closeSelectedEventDialog,
    openDialog: openSelectedEventDialog
  } = useDialog();
  const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>(
    null
  );
  const [dates, setDates] = React.useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });

  const { mutateAsync: addEvent, data: eventResponse } = useAddEvent();

  const handleDeleteEvent = React.useCallback(() => {
    // Add your logic here to delete the event
    closeSelectedEventDialog();
  }, [closeSelectedEventDialog]);

  const handleSelectSlot = React.useCallback(
    async ({ title, description }: { title: string; description: string }) => {
      if (title && dates.start && dates.end) {
        const newEvent = {
          startingAT: new Date(dates.start),
          endingAT: new Date(dates.end),
          name: title,
          description: description
        };
        // setEvents(prev => [...prev, newEvent]);
        await addEvent(newEvent);
        closeSlotDialog();
      }
    },
    [closeSlotDialog, dates.end, dates.start, setEvents]
  );

  const handleSelectEventSlot = React.useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (start && end) {
        setDates({ start, end });
        openSlotDialog();
      }
    },
    [openSlotDialog]
  );

  const eventStyleGetter = React.useCallback(
    (event: EventType, start: Date, end: Date, isSelected: boolean) => {
      const currentDate = new Date();
      const eventStartDate = new Date(event.startingAT);

      let backgroundColor = '#E1E1E1'; // Default background color for past events

      if (eventStartDate.toDateString() === currentDate.toDateString()) {
        // Today's event,  background color
        backgroundColor = '#17CBEB';
      } else if (eventStartDate > currentDate) {
        // Future event,  background color
        backgroundColor = '#1273EB';
      }

      return {
        style: {
          backgroundColor
        }
      };
    },
    []
  );

  const handleSelectEvent = React.useCallback(
    (event: EventType) => {
      setSelectedEvent(event);
      openSelectedEventDialog();
    },
    [openSelectedEventDialog]
  );

  const { defaultDate, scrollToTime } = React.useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6)
    }),
    []
  );

  return (
    <div style={{ height: '100%' }}>
      <Calendar
        defaultDate={defaultDate}
        localizer={localizer}
        // @ts-ignore
        events={transformedNewsEvents}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        onSelectSlot={handleSelectEventSlot}
        selectable
        scrollToTime={scrollToTime}
        popup
      />
      {isSlotDialogOpen && (
        <EventSlotDialogForm
          isSlotDialogOpen={isSlotDialogOpen}
          setEvents={setEvents}
          closeSlotDialog={closeSlotDialog}
          openSlotDialog={openSlotDialog}
          handleSelectSlot={handleSelectSlot}
        />
      )}
      {isSelectedEventDialogOpen && (
        <EventSlotDetails
          closeSelectedEventDialog={closeSelectedEventDialog}
          isSelectedEventDialogOpen={isSelectedEventDialogOpen}
          selectedEvent={selectedEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
}
