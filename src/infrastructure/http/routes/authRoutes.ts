import express, { type Request, type Response } from 'express';
import makeRegisterUserController from '../controllers/RegisterUserController.js';
import makeLoginUserController from '../controllers/LoginUserController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import makeRateLimiter from '../middlewares/RateLimiting.js';

const router = express.Router();

const registerUserController =  makeRegisterUserController();
const loginUserController = makeLoginUserController();

router.post('/register', makeRateLimiter(60 * 60 * 1000, 5), registerUserController.registerUser);
router.post('/login', loginUserController.loginUser);
router.get('/check', authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    loggedIn: true,
    user: {
      userId: req.user?.userId,
      email: req.user?.email
    }
  });
});

export default router;
