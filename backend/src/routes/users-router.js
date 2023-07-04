import express from 'express';
import usersController from '../controllers/users-controller';

const router = express.Router();

router.post('/api/login', usersController.login);
router.post('/api/register', usersController.register);

export default router;
