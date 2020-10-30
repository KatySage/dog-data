import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import { fade } from "@material-ui/core/styles/colorManipulator";
import TooltipHeader from "./TooltipHeader";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
const URL = "http://localhost:3001/schedule";

const makeQueryString = (currentDate, currentViewName) => {
  const format = "YYYY-MM-DDTHH:mm:ss";
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
    encodeURI(
      `${URL}?filter=[["EndDate", ">", "${start.format(
        format
      )}"],["StartDate", "<", "${end.format(format)}"]]`
  );
  return encodeURI(
    `${URL}?filter=[["EndDate", ">", "${start.format(
      format
    )}"],["StartDate", "<", "${end.format(format)}"]]`
  );
};
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
const ToolbarWithLoading = withStyles(style, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);
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

const TimeTableCell = withStyles(style, { name: "TimeTableCell" })(
  TimeTableCellBase
);

const TimeTableCellBaseMonth = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <MonthView.TimeTableCell {...restProps} className={classes.weekendCell} />
    );
  }
  return <MonthView.TimeTableCell {...restProps} />;
};
const TimeTableCellMonth = withStyles(style, { name: "TimeTableCell" })(
  TimeTableCellBaseMonth
);
const DayScaleCellBase = ({ classes, ...restProps }) => {
  const { startDate, today } = restProps;
  if (today) {
    return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...restProps} />;
};
const DayScaleCell = withStyles(style, { name: "DayScaleCell" })(
  DayScaleCellBase
);

const mapAppointmentData = (appointment) => ({
  ...appointment,
  startDate: appointment.startdate,
  endDate: appointment.enddate,
  title: appointment.text,
  rRule: appointment.recurrencerule,
  id: appointment.appointmentId,
  allDay: appointment.allday,
  notes: appointment.description,
  location: appointment.location
});
function createAppt(stateItem) {
  console.log("Posting appt to API...");
  fetch("http://localhost:3001/schedule/add", {
    method: 'POST',
    body: stateItem
  })
    .then((response) => console.log(response))
    .then((data) => {
      console.log(data)
    });
}

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentDate: "2020-10-28",
      currentViewName: "Week",
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      data: this.props.data,
      resources: [
        {
          fieldName: "text",
          title: "Activity",
          instances: [
            { id: "Dog Fed", text: "Dog Fed" },
            { id: "Vet Visit", text: "Vet Visit" },
            { id: "Dog Walked", text: "Dog Walked" },
            { id: "Dog Meds", text: "Dog Meds" },
            { id: "Dog Groomed", text: "Dog Groomed" },
            { id: "Dog Park", text: "Dog Park" }
          ]
        }
      ]
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    // const format = "YYYY-MM-DDTHH:mm:ss";
    //     addedAppointment.startDate = (moment(addedAppointment.startDate).format(format))
    //     addedAppointment.endDate = (moment(addedAppointment.startDate).format(format))
    this.setState({ addedAppointment });
  }
<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          this.setState({
            data,
            loading: false
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
        console.log(this.state.data[this.state.data.length - 1])
        const startingAddedId =
        data[data.length - 1].appointmentId + 1
        data = [...data, { appointmentId: startingAddedId, ...added }];
    // createAppt(data[data.length-1])
    createAppt(data[data.length-1])
    console.log(data[data.length-1])
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
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
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
      loading,
      currentViewName,
      resources
    } = this.state;
    const formattedData = data ? data.map(mapAppointmentData) : [];
    return (
      <Paper>
        <Scheduler data={formattedData} height={680}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <EditRecurrenceMenu />
          <DayView startDayHour={5} endDayHour={23} cellDuration={60} />
          <WeekView
            startDayHour={5}
            endDayHour={23}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
            cellDuration={60}
          />
          <MonthView timeTableCellComponent={TimeTableCellMonth} />

          <Appointments />
          <Resources data={resources} />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />

          <AppointmentTooltip
            headerComponent={TooltipHeader}
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm
          />
        </Scheduler>
      </Paper>
    );
  }
}
