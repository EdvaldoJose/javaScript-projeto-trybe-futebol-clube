import { NextFunction, Request, Response } from 'express';

import Joi = require('joi');

import CustomError from '../utils/statusError';

// const MESSAGE_ERROR = 'Invalid email or password';
// const loginShema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// }).error();

const loginShema = Joi.object({
  email: Joi.string().email().required().error(new Error('Invalid email or password')),
  password: Joi.string().min(6).required().error(new Error('Invalid email or password')),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginShema.validate(req.body);
  const { email, password } = req.body;

  if (!email) {
    throw new CustomError('All fields must be filled', 400);
  }

  if (!password) {
    throw new CustomError('All fields must be filled', 400);
  }

  if (email.length === 0) {
    return res.status(400).json({ message: error?.message });
  }

  console.log(error);

  if (error) {
    return res.status(401).json({ message: error.message });
  }
  next();
};

export default validateLogin;
