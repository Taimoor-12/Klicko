import express from 'express';
import makeRegisterUserController from '../controllers/RegisterUserController.js';

const router = express.Router();

const registerUserController =  makeRegisterUserController();

router.post('/register', registerUserController.registerUser);

export default router;
