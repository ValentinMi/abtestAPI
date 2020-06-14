const router = require("express").Router();
const { validate, Config } = require("../models/config.model");

// GET -- Get all configs
router.get("/", async (req, res) => {
  try {
    const configs = await Config.find();
    if (!configs || configs.length === 0)
      return res.status(404).send("No configs found");

    res.send(configs);
  } catch (error) {
    console.log(error.message);
  }
});

// GET -- Get a config with id
router.get("/:id", async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) return res.status(404).send("Config not found");

    res.send(config);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Create a new config
router.post("/", async (req, res) => {
  try {
    // Validate
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const newConfig = new Config(req.body);

    await newConfig.save();

    res.send(newConfig);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE -- Delete a config with id
router.delete("/:id", async (req, res) => {
  try {
    const config = Config.findByIdAndRemove(req.params.id);
    if (!config) return res.status(404).send("Confit not found");

    res.send(config);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
