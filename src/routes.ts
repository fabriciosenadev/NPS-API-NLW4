import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SurveysUsersRepository } from './respositories/SurveysUsersRepository';

const router = Router();

//#region Controllers

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

//#endregion

//#region Routes

router.post("/users", userController.create);

router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

router.post("/sendMail", sendMailController.execute);

//#endregion

export { router };