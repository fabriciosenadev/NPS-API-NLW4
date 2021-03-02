import { Router } from 'express';
import { AnswerControler } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

//#region Controllers

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMailController();

const answerControler = new AnswerControler();

const npsController = new NpsController();

//#endregion

//#region Routes

router.post("/users", userController.create);

router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answerControler.execute);

router.get("/nps/:survey_id", npsController.execute);

//#endregion

export { router };