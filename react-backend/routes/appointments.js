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
    console.log(req.body)
  });

router.post("/change", async (req, res) => {
    console.log(req.body)
  });
module.exports = router;