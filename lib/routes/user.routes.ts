import Router from 'express';
import UserController from '../controller/user.controller';

const router = Router();
const userController = new UserController();

router.post('/add', userController.add);

export default router;