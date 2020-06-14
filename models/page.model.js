const mongoose = require("mongoose");
const Joi = require("Joi");

const Page = mongoose.model(
  "Page",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true
    },
    config: {
      type: Array,
      minlength: 0
    },
    "config-test": {
      type: Array,
      minlength: 0
    },
    creationDate: {
      type: Date,
      required: true
    }
  })
);

const validatePage = page => {
  const schema = Joi.schema({
    name: Joi.string().min(1).max(255).required(),
    config: Joi.array(),
    "config-test": Joi.array(),
    creationDate: Joi.date().required()
  });
};

exports.validate = validatePage;
exports.Page = Page;
