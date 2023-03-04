import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import CustomError from '../utils/statusError';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError('Token not found', 404);
  }

  try {
    jwt.verify(authorization, process.env.JWT_SECRET as string) as Record<string, string>;
    return next();
  } catch (_error) {
    throw new CustomError('Token must be a valid token', 401);
  }
};

export default tokenValidation;
