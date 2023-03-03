import { Router } from 'express';
import TeamController from '../controller/TeamsController';
import TeamService from '../services/TeamsService';

const teamRouter = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.use('/:id', (req, res) => teamController.getById(req, res));
teamRouter.use('/', (req, res) => teamController.getAll(req, res));

export default teamRouter;
