import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(10).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: "Validation error.",
      details: error.details[0].message,
    });
  }
  next();
};

export default validateUser;
