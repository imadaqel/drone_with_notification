import express from 'express';
import jobRouter from "./api/Jobs/JOB.router"
export class Routes {
  public routes(app: express.Router): void {
    app.use('/api/jobs/',jobRouter);
    app.use(express.static('C:\\Users\\tsabra\\Desktop\\drone-backend\\droneback-end\\Media\\Images'),express.static('C:\\Users\\tsabra\\Desktop\\drone-backend\\droneback-end\\Media\\Videos'));
  }
}
