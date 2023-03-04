import { NextFunction, Request, Response } from 'express';

import Joi = require('joi');

const MESSAGE_ERROR = 'All fields must be filled';

const loginShema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': MESSAGE_ERROR,
    'any.required': MESSAGE_ERROR,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': MESSAGE_ERROR,
    'any.required': MESSAGE_ERROR,
  }),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginShema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export default validateLogin;
