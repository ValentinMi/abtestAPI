const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Tracking = mongoose.model(
  "Tracking",
  new mongoose.Schema({
    url: {
      type: String,
      minlength: 6,
      maxlength: 1555,
      required: true
    },
    elmType: {
      type: String,
      minlength: 4,
      maxlength: 6,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    sectionClicked: new mongoose.Schema({
      id: {
        type: Number,
        required: true
      }
    }),
    pageConfig: {
      type: Object,
      required: true
    }
  })
);

const validateTracking = tracking => {
  const schema = Joi.object({
    url: Joi.string().min(6).max(1555).required(),
    elmType: Joi.string().min(4).max(6).required(),
    timestamp: Joi.date().required(),
    sectionClicked: Joi.any().required(),
    pageConfig: Joi.any().required()
  });

  return schema.validate(tracking);
};

exports.validate = validateTracking;
exports.Tracking = Tracking;
