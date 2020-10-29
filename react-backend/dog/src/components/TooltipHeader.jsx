import food from '../icons/food.png'
import groom from '../icons/groom.png'
import meds from '../icons/meds.png'
import vet from '../icons/vet.png'
import park from '../icons/park.png'
import walk from '../icons/walk.png'
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import classNames from "clsx";
import { withStyles } from "@material-ui/core/styles";

const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    food: {
        background: `url(${food})`,
    },
    groom: {
      background: `url(${groom})`,
    },
    meds: {
      background: `url(${meds})`,
    },
    vet: {
      background: `url(${vet})`,
    },
    walk: {
      background: `url(${walk})`,
    },
    park: {
      background: `url(${park})`,
    },
    header: {
      height: '130px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      
    }
})

const getClassByText = (classes, text) => {
    if (text === 'Dog Fed') return classes.food;
    if (text === 'Dog Groomed') return classes.groom;
    if (text === 'Dog Meds') return classes.meds;
    if (text === 'Dog Park') return classes.park;
    if (text === 'Vet Visit') return classes.vet;
    if (text === 'Dog Walked') return classes.walk;
  };

const TooltipHeader = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      className={classNames(getClassByText(classes, appointmentData.text), classes.header)}
      appointmentData={appointmentData}
    />
));
  export default TooltipHeader