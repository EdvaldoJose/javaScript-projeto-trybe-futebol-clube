import { Router } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => leaderBoardController.getHomeStatistic(req, res));
leaderBoardRouter.get('/awy', (req, res) => leaderBoardController.getAwyStatistic(req, res));

export default leaderBoardRouter;
