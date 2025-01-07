import Joi from "joi";

const ticketSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  event_id: Joi.string().uuid().required(),
  eventName: Joi.string().required(),
});

const validateTicket = (req, res, next) => {
  const { error } = ticketSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: "Validation error.",
      details: error.details[0].message,
    });
  }
  next();
};

export default validateTicket;
