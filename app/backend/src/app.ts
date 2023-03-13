import 'express-async-errors';
import * as express from 'express';
import teamRouter from './routes/team.route';
import loginRouter from './routes/login.route';
import middlewareError from './middlewares/middlewareError';
import matchesRouter from './routes/matche.route';
import leaderBoardRouter from './routes/leaderBoard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/leaderBoard', leaderBoardRouter);
    this.app.use(middlewareError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
// // Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
// export const { app } = new App();
export default App;
