import Joi from "joi";

const eventSchema = Joi.object({
  eventName: Joi.string().required(),
  eventType: Joi.string().required(),
  eventStartDate: Joi.string().required(),
  eventEndDate: Joi.string().required(),
  streetname: Joi.string().required(),
  locality: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  organizing_entity: Joi.string().required(),
  organizing_secondary_contact_email: Joi.string().email().optional(),
  organizing_poc: Joi.string().required(),
  eventShortDescription: Joi.string().required(),
  eventLongDescription: Joi.string().optional(),
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
