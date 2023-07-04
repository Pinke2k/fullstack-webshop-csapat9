import express from 'express';
import verfiySessionController from '../controllers/verfiy-session-controller';

const router = express.Router();

router.post('/api/verify', verfiySessionController.verifySession);

export default router;
