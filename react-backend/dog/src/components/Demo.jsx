import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableCell from "@material-ui/core/TableCell";
import moment from 'moment';
import {
  darken,
  fade,
  lighten
} from "@material-ui/core/styles/colorManipulator";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { owners } from "../demo-data/month-appointments"
import { activities } from "../demo-data/month-appointments"
const URL = 'http://localhost:3001/schedule';

const makeQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  console.log(encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`))
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};

const appointments = [
  {
    id: 0,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30),
    ownerId: 1
  },
  {
    id: 1,
    title: "Monthly Planning",
    startDate: new Date(2018, 5, 28, 9, 30),
    endDate: new Date(2018, 5, 28, 11, 30),
    ownerId: 1
  },
  {
    id: 2,
    title: "Recruiting students",
    startDate: new Date(2018, 6, 9, 12, 0),
    endDate: new Date(2018, 6, 9, 13, 0),
    ownerId: 2
  },
  {
    id: 3,
    title: "Oil Painting",
    startDate: new Date(2018, 6, 18, 14, 30),
    endDate: new Date(2018, 6, 18, 15, 30),
    ownerId: 2
  },
  {
    id: 4,
    title: "Open Day",
    startDate: new Date(2018, 6, 20, 12, 0),
    endDate: new Date(2018, 6, 20, 13, 35),
    ownerId: 6
  },
  {
    id: 5,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 6, 13, 0),
    endDate: new Date(2018, 6, 6, 14, 0),
    rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
    exDate: "20180713T100000Z,20180727T100000Z",
    ownerId: 2
  },
  {
    id: 6,
    title: "Meeting of Instructors",
    startDate: new Date(2018, 5, 28, 12, 0),
    endDate: new Date(2018, 5, 28, 12, 30),
    rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
    exDate: "20180705T090000Z,20180719T090000Z",
    ownerId: 5
  },
  {
    id: 7,
    title: "Oil Painting for Beginners",
    startDate: new Date(2018, 6, 3, 11, 0),
    endDate: new Date(2018, 6, 3, 12, 0),
    rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
    exDate: "20180710T080000Z,20180724T080000Z",
    ownerId: 3
  },
  {
    id: 8,
    title: "Watercolor Workshop",
    startDate: new Date(2018, 6, 9, 11, 0),
    endDate: new Date(2018, 6, 9, 12, 0),
    ownerId: 3
  }
];

const resources = [
  {
    fieldName: "ownerId",
    title: "Owners",
    instances: owners
  },
  { fieldName: "activityType", title: "Activity", instances: activities }
];

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === "light"
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const styles = (theme) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none"
    },
    "&:last-child": {
      paddingRight: 0
    },
    "tr:last-child &": {
      borderBottom: "none"
    },
    "&:hover": {
      backgroundColor: "white"
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0
    }
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center"
  },
  text: {
    padding: "0.5em",
    textAlign: "center"
  },

  opacity: {
    opacity: "0.5"
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6
    }
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2
    }
  },
  flexibleSpace: {
    flex: "none"
  },
  flexContainer: {
    display: "flex",
    alignItems: "center"
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px"
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block"
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle"
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super"
  },
  textCenter: {
    textAlign: "center"
  },
  dateAndTitle: {
    lineHeight: 1.1
  },
  titleContainer: {
    paddingBottom: theme.spacing(2)
  },
  container: {
    paddingBottom: theme.spacing(1.5)
  }
});
const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);
const style = (theme) => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.14)
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.16)
    }
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04)
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04)
    }
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16)
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06)
  }
});
const TimeTableCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return (
      <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />
    );
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...restProps} />;
};
const TimeTableCellToo = withStyles(style, { name: "TimeTableCell" })(
  TimeTableCellBase
);
// #FOLD_BLOCK
const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth
    // #FOLD_BLOCK
  }) => {
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: "numeric", month: "long" }
      : { day: "numeric" };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.opacity]: otherMonth
        })}
      >
        <div className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  }
);

const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);
const mapAppointmentData = appointment => ({
  ...appointment,
  startDate: appointment.StartDate,
  endDate: appointment.EndDate,
  title: appointment.Text,
});
const Appointment = withStyles(styles, {
  name: "Appointment"
})(({ classes, ...restProps }) => (
  <Appointments.Appointment {...restProps} className={classes.appointment} />
));

const AppointmentContent = withStyles(styles, {
  name: "AppointmentContent"
})(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
));
function createAppt(stateItem) {
  console.log('Posting appt to API...');
  fetch('http://localhost:3001/schedule/change', {
    method: 'post',
    body: JSON.stringify(stateItem)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('Created Appt:', data.Text);
  });
}
export default class Demo extends React.PureComponent {

  constructor(props) {
    super(props);

   
    this.state = {
      loading: true,
      currentDate: '2017-05-23',
      currentViewName: 'Week',
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };
    
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
          });
        }, 600);
      })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }
  

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? createAppt({ ...appointment, ...changed[appointment.id] })
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, loading, currentDate, currentViewName } = this.state;
    const formattedData = data
      ? data.map(mapAppointmentData) : [];
    return (
      <Paper>
        <Scheduler data={formattedData}>
          <EditingState onCommitChanges={this.commitChanges} />
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView startDayHour={5} endDayHour={21} />
          <WeekView
            startDayHour={9}
            endDayHour={18}

          />
          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources data={resources} />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />

          <EditRecurrenceMenu />
          <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
