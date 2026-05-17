import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import apiRoutes from './routes/index';
import dashboardRoutes from './routes/dashboard.routes';
import checkinsRoutes from './routes/checkins.routes';
import goalRoutes from './routes/goals.routes';
import managerRoutes from './routes/manager.routes';
import reportsRoutes from './routes/reports.routes';
import sharedGoalsRoutes from './routes/sharedGoals.routes';
import auditRoutes from './routes/audit.routes';
import notificationsRoutes from './routes/notifications.routes';

const app = express();

function sanitizeValue(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map(sanitizeValue);
	}

	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => [
				key.replace(/[$.]/g, ''),
				sanitizeValue(entryValue),
			]),
		);
	}

	return value;
}

app.use((req, _res, next) => {
	if (req.body && typeof req.body === 'object') {
		req.body = sanitizeValue(req.body);
	}

	if (req.params && typeof req.params === 'object') {
		req.params = sanitizeValue(req.params) as typeof req.params;
	}

	next();
});

app.use(helmet());
app.use(
	cors({
		origin: env.clientUrl,
		credentials: true,
	}),
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/shared-goals', sharedGoalsRoutes);
app.use('/api/checkins', checkinsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/dashboard', dashboardRoutes);

export default app;
