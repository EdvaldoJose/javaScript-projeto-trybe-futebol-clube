import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import MatchesService from '../services/MatchesService';
import tokenValidation from '../middlewares/tokenValidation';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matcheRouter = Router();

matcheRouter.get('/', (req, res) => matchesController.getAll(req, res));
matcheRouter.patch(
  '/:id/finish',
  tokenValidation,
  (req, res) => matchesController
    .finished(req, res),
);

matcheRouter.patch('/:id', tokenValidation, (req, res) => matchesController.update(req, res));
matcheRouter.post('/', tokenValidation, (req, res) => matchesController.addMatch(req, res));

export default matcheRouter;
