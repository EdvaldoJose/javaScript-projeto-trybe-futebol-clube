import { Response, Request } from 'express';
import jwt = require('jsonwebtoken');
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.loginService.login({ email, password });
    res.status(200).json({ token });
    // console.log('token');
  }

  async validate(req: Request, res: Response) {
    const { authorization } = req.headers as any;

    const { id }: Record<string, string> = jwt.verify(authorization,
      process.env.JWT_SECRET as string,
    ) as Record<string, string>;

    const role = await this.loginService.validate(Number(id));
    return res.status(200).json({ role });
  }
}
