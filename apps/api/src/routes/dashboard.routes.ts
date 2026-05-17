import { Router } from 'express';
import { adminDashboard, employeeDashboard, managerDashboard } from '../controllers/dashboard.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth);
router.get('/employee', requireRole('employee', 'manager', 'admin'), employeeDashboard);
router.get('/manager', requireRole('manager', 'admin'), managerDashboard);
router.get('/admin', requireRole('admin'), adminDashboard);

export default router;
