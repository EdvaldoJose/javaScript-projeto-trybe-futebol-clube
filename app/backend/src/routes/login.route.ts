import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import loginValidation from '../middlewares/loginValidation';
import LoginService from '../services/LoginService';
import LoginController from '../controller/LoginController';

const loginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.get('/role', tokenValidation, (req, res) => loginController.validate(req, res));
loginRouter.post('/', loginValidation, (req, res) => loginController.login(req, res));

export default loginRouter;
