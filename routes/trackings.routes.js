const router = require("express").Router();
const { validate, Tracking } = require("../models/tracking.model");
const Joi = require("@hapi/joi");

// GET -- Get all trackings
router.get("/", async (req, res) => {
  try {
    const trackings = await Tracking.find();
    if (!trackings || trackings.length === 0)
      return res.status(404).send("Trackings not found");

    res.send(trackings);
  } catch (error) {
    console.log(error.message);
  }
});

// GET -- Get a tracking with id
router.get("/:id", async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);
    if (!tracking) return res.status(404).send("Tracking not found");

    res.send(tracking);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Post an url to receive all trackings with this url
router.post("/url", async (req, res) => {
  try {
    const schema = Joi.object({
      url: Joi.string().min(5).max(1555).required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const trackings = Tracking.find(tracking => tracking.url === req.body.url);
    if (!trackings)
      return res.status(404).send("Trackings not found with this url");

    res.send(trackings);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Post a new tracking
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const newTracking = new Tracking(req.body);
    await newTracking.save();

    res.send(newTracking);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
