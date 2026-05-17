import { Router } from 'express';
import { listAuditLogs } from '../controllers/audit.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', listAuditLogs);

export default router;
