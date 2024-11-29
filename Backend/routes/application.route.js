const express  = require('express');

const { updateStatus,    getApplicants, getAppliedJobs,applyJob} = require("../controllers/application.controller");

const { isAuthenticated } = require('../middlewares/authenticate');


const router = express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);  

router.route("/status/:id/update").put(isAuthenticated,updateStatus);




module.exports= router;
