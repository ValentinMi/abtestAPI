const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Config = mongoose.model(
  "Config",
  new mongoose.Schema({
    isTest: {
      type: Boolean,
      required: true
    },
    creationDate: {
      type: Date,
      required: true
    },
    config: {
      type: Array,
      minlength: 1,
      required: true
    }
  })
);

const validateConfig = config => {
  const schema = Joi.object({
    isTest: Joi.boolean().required(),
    creationDate: Joi.date().required(),
    config: Joi.array().minlength(1).required()
  });

  return schema.validate(config);
};

exports.validate = validateConfig;
exports.Config = Config;
