import { Router } from 'express';
import { createGoal, listGoals, submitGoal, updateGoal } from '../controllers/goals.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);
router.get('/', listGoals);
router.post('/', createGoal);
router.put('/:goalId', updateGoal);
router.post('/:goalId/submit', submitGoal);

export default router;
