var express = require('express');
var router = express.Router();
const db = require("../models/conn"),
    appointmentsList = require('../models/appointmentsModel');

/* GET appts listing. */
router.get('/', async (req, res) => {
    const apptInfo = await appointmentsList.showAllAppts();
    console.log(apptInfo)
    res.json(apptInfo)
    });

router.post("/add", async (req, res) => {
  console.log('you posted')
  console.log(req.body)
    // let { Activity, StartDate, EndDate, Location, Description } = req.body
    // let newStartDate = `${StartDate.split(/[ \[\]\r\n/\\]+/)[2]}-${StartDate.split(/[ \[\]\r\n/\\]+/)[0]}-${StartDate.split(/[ \[\]\r\n/\\]+/)[1]}T${StartDate.split(/[ \[\]\r\n/\\]+/)[3]}:00`
    // let newEndDate = `${EndDate.split(/[ \[\]\r\n/\\]+/)[2]}-${EndDate.split(/[ \[\]\r\n/\\]+/)[0]}-${EndDate.split(/[ \[\]\r\n/\\]+/)[1]}T${EndDate.split(/[ \[\]\r\n/\\]+/)[3]}:00`
    // if (newStartDate === newStartDate) {
    // const response = (!!Activity ? await appointmentsList.addAppt(Activity, newStartDate, newEndDate, !!Location ? Location : null, !!Description ? Description : null) : null)
    //   }
    // res.redirect(`http://localhost:3000/`)
  });

router.post("/change", async (req, res) => {
    console.log('hey')
  });
module.exports = router;