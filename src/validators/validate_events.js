import Joi from "joi";

const eventSchema = Joi.object({
  eventName: Joi.string().min(3).max(20).required(),
  eventType: Joi.string().min(3).max(10).required(),
  eventStartDate: Joi.string().required(),
  eventEndDate: Joi.string().required(),
  streetname: Joi.string().min(3).max(10).required(),
  locality: Joi.string().min(3).max(10).required(),
  city: Joi.string().min(3).max(10).required(),
  state: Joi.string().min(3).max(10).required(),
  organizing_entity: Joi.string().min(3).max(10).required(),
  organizing_secondary_contact_email: Joi.string().email().optional(),
  organizing_poc: Joi.string().min(3).max(30).required(),
  eventShortDescription: Joi.string().min(3).max(100).required(),
  eventLongDescription: Joi.string().min(3).max(300).optional(),
  eventProfileImage: Joi.string().optional(),
  pricePerUnit: Joi.string().required(),
  ticketsAvailable: Joi.string().required(),
});

const validateEvents = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: "Validation error.",
      details: error.details[0].message,
    });
  }
  next();
};

export default validateEvents;
