const express = require("express");
const router = express.Router();
const controller = require("./incident.controller");

router.get("/", controller.listOfIncidents);
router.get("/cinema/:name", controller.listOfCinemas);


router.get("/:id", controller.singleIncident);

router.post("/", controller.create);

router.delete("/:id", controller.removeIncidentById);

module.exports = router;
