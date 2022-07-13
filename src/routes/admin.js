import { Router } from 'express';
import { getDashboard } from '../controllers/Dashboard.js';

const router = Router();

router.get('/dashboard', getDashboard);

export default router;
