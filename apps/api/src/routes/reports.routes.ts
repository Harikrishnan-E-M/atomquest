import { Router } from 'express';
import { exportCsvReport, exportExcelReport, plannedVsActualReport } from '../controllers/reports.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);
router.get('/planned-vs-actual', plannedVsActualReport);
router.get('/export/csv', exportCsvReport);
router.get('/export/excel', exportExcelReport);

export default router;
