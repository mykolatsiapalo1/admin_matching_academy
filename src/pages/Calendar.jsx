import React, { useState } from 'react'
import Header from '../layout/partials/header'
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  DragDropProvider,
  EditRecurrenceMenu,
  TodayButton,
  DayView,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import Teachers from '../components/classComp/Teachers';
import CalenderTeachers from '../components/demo-data/CalenderTeachers';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];

  const navigate = useNavigate();

  const appointments = [{
    title: 'Website Re-Design Plan',
    startDate: new Date(2024, 1, 14, 9, 35),
    endDate: new Date(2024, 1, 14, 10, 30),
    id: 0,
    rRule: 'FREQ=DAILY;BYDAY=MO,WE,FR',
    // exDate: '20180628T063500Z,20180626T063500Z',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2024, 0, 25, 12, 11),
    endDate: new Date(2024, 0, 25, 13, 0),
    id: 1,
    // rRule: 'FREQ=DAILY;COUNT=4',
    // exDate: '20180627T091100Z',
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2024, 1, 15, 13, 30),
    endDate: new Date(2024, 1, 15, 14, 35),
    id: 2,
    // rRule: 'FREQ=DAILY;COUNT=5',
  }];

  const commitChanges = ({ added, changed, deleted }) => {
    console.log(added, changed, deleted)
    // this.setState((state) => {
    let { data } = appointments;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted !== undefined) {
      data = data.filter(appointment => appointment.id !== deleted);
    }
    return { data };
    // });
  }

  const Appointment = ({ children, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      onClick={e => handleAppointmentClick(e, data)}
    >
      {children}
    </Appointments.Appointment>
  );

  const handleAppointmentClick = (e, data) => {
    // console.log(data)
    navigate('/classes/view')
  }

  return (
    <div>
      <Header header={'calendar'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8'>
        <div className='space-y-4'>
          <div className='bg-white px-4 py-2.5 flex justify-between items-center'>
            <div className='flex items-center gap-2 text-xl font-semibold'>
            </div>
            <div className='flex items-center gap-3'>
              <CalenderTeachers />
              <Link to={'/classes/view'}>
                <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New class</button>
              </Link>
            </div>
          </div>
          <div className='container bg-white'>
            <Scheduler
              data={appointments}
              onClick={handleAppointmentClick}
            >
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={e => { setCurrentDate(e) }}
              />
              <WeekView
                startDayHour={8}
                endDayHour={18}
              />
              <DayView
                startDayHour={8}
                endDayHour={18}
              />
              <MonthView />
              <Appointments appointmentComponent={Appointment} />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <ViewSwitcher />
            </Scheduler>
          </div>
        </div>
      </div>
    </div>
  )
}
