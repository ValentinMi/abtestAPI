const router = require("express").Router();
const { validate, Page } = require("../models/page.model");
const Joi = require("@hapi/joi");

// GET -- Get a page with id
router.get("/:id", async (req, res) => {
  try {
    // Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).send("Page not found");

    res.send(page);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Get a page with url
router.post("/url", async (req, res) => {
  try {
    const schema = Joi.schema({
      url: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const page = await Page.findOne({ url: req.body.url });
    if (!page) return res.status(404).send("Page not found");

    res.send(page);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Create a new page
router.post("/", async (req, res) => {
  try {
    // Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const newPage = new Page(req.body);

    await newPage.save();
    res.send(newPage);
  } catch (error) {
    console.log(error.message);
  }
});

// PUT --  Edit a page with id
router.put("/:id", async (req, res) => {
  try {
    // Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const page = await Page.findByIdAndUpdate(req.params.id, req.body);
    if (!page) return res.status(404).send("Page not found");

    res.send(page);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE -- Delete a page with id
router.delete("/:id", async (req, res) => {
  try {
    const page = await Page.findByIdAndRemove(req.params.id);
    if (!page) return res.status(404).send("Page not found");

    res.send(page);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
