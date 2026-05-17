import { Router } from 'express';
import { createSharedGoal, listSharedGoals, syncSharedGoal } from '../controllers/sharedGoals.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth, requireRole('manager', 'admin'));
router.get('/', listSharedGoals);
router.post('/', createSharedGoal);
router.patch('/:sharedGoalId', syncSharedGoal);

export default router;
