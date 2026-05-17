import { Router } from 'express';
import { createCheckIn, listCheckIns } from '../controllers/checkins.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);
router.get('/', listCheckIns);
router.post('/', createCheckIn);

export default router;
