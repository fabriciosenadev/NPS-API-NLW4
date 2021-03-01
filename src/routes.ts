import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

//#region Controllers

const userController = new UserController();

//#endregion

//#region Routes

router.post("/users", userController.create);

//#endregion

export { router };