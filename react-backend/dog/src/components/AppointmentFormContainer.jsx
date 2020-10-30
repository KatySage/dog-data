
import * as React from "react";
import PetsIcon from '@material-ui/icons/Pets';
import MenuItem from '@material-ui/core/MenuItem';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LocationOn from "@material-ui/icons/LocationOn";
import Notes from "@material-ui/icons/Notes";
import CalendarToday from "@material-ui/icons/CalendarToday";


const containerStyles = (theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  header: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: "right"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  picker: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0
    },
    width: "50%"
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  textField: {
    width: "100%"
  }
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {}
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes
    };
    this.setState({
      appointmentChanges: nextChanges
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges()
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {}
    });
  }

  render() {
    const {
      classes,
      appointmentData,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges
    };
    const textEditorProps = (field) => ({
      variant: "outlined",
      name: {field},
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField
    });

    const pickerEditorProps = (field) => ({
      className: classes.picker,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field])
        }),
      inputVariant: "outlined",
      format: "MM/DD/YYYY HH:mm",
      onError: () => null
    });
    return (
      <>
        <form action={`http://localhost:3001/schedule/add`} method='POST'>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <PetsIcon className={classes.icon} color="action" />
              <TextField {...textEditorProps("Activity")} 
              name="Activity" required select>
          <MenuItem value="" disabled>Activity</MenuItem>
          <MenuItem value={'Vet Visit'}>Vet Visit</MenuItem>
          <MenuItem value={'Dog Walked'}>Dog Walked</MenuItem>
          <MenuItem value={'Dog Park'}>Dog Park</MenuItem>
          <MenuItem value={'Dog Fed'}>Dog Fed</MenuItem>
          <MenuItem value={'Dog Meds'}>Dog Meds</MenuItem>
          <MenuItem value={'Dog Groomed'}>Dog Groomed</MenuItem>
          </TextField>
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps("startDate")}
                  name="StartDate"
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps("endDate")}
                  name="EndDate"
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField {...textEditorProps("notes")} 
              name="Description"
              multiline rows="6" />
            </div>

            
          </div>
          <div className={classes.buttonGroup}>
            <Button
              variant="outlined"
              color="primary"
              type='submit'
              className={classes.button}
              onClick={() => {
              }}
            >
              Create
            </Button>
          </div>
        </form>
        </>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, {
  name: "AppointmentFormContainer"
})(AppointmentFormContainerBasic);
export default AppointmentFormContainer 