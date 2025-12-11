import express from 'express';
import makeRegisterUserController from '../controllers/RegisterUserController.js';
import makeLoginUserController from '../controllers/LoginUserController.js';

const router = express.Router();

const registerUserController =  makeRegisterUserController();
const loginUserController = makeLoginUserController();

router.post('/register', registerUserController.registerUser);
router.post('/login', loginUserController.loginUser);

export default router;
