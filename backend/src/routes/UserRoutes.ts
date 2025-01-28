import {Router} from 'express'
import userController from '../controllers/UserController';

const router = Router();

router.post('/adduser', userController.createUser);

export default router;
