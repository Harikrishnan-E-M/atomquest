import { Router } from 'express';
import { approveGoal, listReviewGoals, rejectGoal, updateReviewGoal } from '../controllers/manager.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('manager', 'admin'));
router.get('/goals', listReviewGoals);
router.patch('/goals/:goalId', updateReviewGoal);
router.post('/goals/:goalId/approve', approveGoal);
router.post('/goals/:goalId/reject', rejectGoal);

export default router;
