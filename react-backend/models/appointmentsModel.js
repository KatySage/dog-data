const db = require("./conn");

class AppointmentsList {
  constructor(AppointmentId, Description, EndDate, StartDate, Text, RecurrenceRule, AllDay) {
    this.AppointmentId = AppointmentId;
    this.Description = Description;
    this.EndDate = EndDate;
    this.StartDate = StartDate;
    this.Text = Text;
    this.RecurrenceRule = RecurrenceRule;
    this.AllDay = AllDay;
  }
  static async showAllAppts() {
    try {
      const response = await db.any(
        `SELECT * FROM appointments;`
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error.message);
      return error.message;
    }
  }
}
module.exports = AppointmentsList;