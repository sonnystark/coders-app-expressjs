import Joi from "joi";

const challengeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid("Easy", "Medium", "Hard").required(),
});

export const validateChallenge = (req, res, next) => {
  const { error } = challengeSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
