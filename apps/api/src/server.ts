import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { scheduleQuarterlyReminderJob } from './jobs/quarterlyReminder.job.js';

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.env');
dotenv.config({ path: envPath });

async function startServer() {
  await connectDatabase();
  scheduleQuarterlyReminderJob();

  const server = createServer(app);

  server.listen(env.port, () => {
    console.log(`API listening on port ${env.port}`);
  });
}

void startServer();
