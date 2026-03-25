import express, { type Request, type Response } from 'express';
import makeRegisterUserController from '../controllers/RegisterUserController.js';
import makeLoginUserController from '../controllers/LoginUserController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import makeRateLimiter from '../middlewares/RateLimiting.js';

const router = express.Router();

const registerUserController =  makeRegisterUserController();
const loginUserController = makeLoginUserController();

const ONE_HOUR_MS = 60 * 60 * 1000;
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

router.post('/register', makeRateLimiter(ONE_HOUR_MS, 5), registerUserController.registerUser);
router.post('/login', 
  makeRateLimiter(FIFTEEN_MINUTES_MS, 10), 
  makeRateLimiter(FIFTEEN_MINUTES_MS, 10, 'email'), 
  loginUserController.loginUser
);
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
