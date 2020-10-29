const db = require("./conn");

class AppointmentsList {
  constructor(AppointmentId, Description, EndDate, StartDate, Text, RecurrenceRule, AllDay, Location) {
    this.AppointmentId = AppointmentId;
    this.Description = Description;
    this.EndDate = EndDate;
    this.StartDate = StartDate;
    this.Text = Text;
    this.RecurrenceRule = RecurrenceRule;
    this.AllDay = AllDay;
    this.Location = Location;
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
  static async addAppt(Activity, newStartDate, newEndDate, Location, Description){
      try {
        const response = await db.result(
          `INSERT INTO appointments (Text, StartDate, EndDate, Location, Description) VALUES ($1, $2, $3, $4, $5);`,
          [Activity, newStartDate, newEndDate, Location, Description]
        );
        return response;
      } catch (error) {
        console.error("ERROR: ", error.message);
        return error.message;
      }
  }
}
module.exports = AppointmentsList;