import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

//#region Controllers

const userController = new UserController();
const surveysController = new SurveysController();

//#endregion

//#region Routes

router.post("/users", userController.create);

router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

//#endregion

export { router };