const router = require("express").Router();
const { validate, Page } = require("../models/page.model");

// GET -- Get a page with id
router.get("/:id", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Bad request");

  const page = await Page.findById(req.params.id);
  if (!page) return res.status(404).send("Page not found");

  res.send(page);
});

// POST -- Create a new page
router.post("/", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Bad request");

  const newPage = new Page(req.body);

  await newPage.save();
  res.send(newPage);
});

// PATCH --  Edit a page with id
router.patch("/:id", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Bad request");

  const page = await Page.findByIdAndUpdate(req.params.id, req.body);
  if (!page) return res.status(404).send("Page not found");

  res.send(page);
});

// DELETE -- Delete a page with id
router.delete("/:id", async (req, res) => {
  const page = await Page.findByIdAndRemove(req.params.id);
  if (!page) return res.status(404).send("Page not found");

  res.send(page);
});
