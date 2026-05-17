import { useEffect, useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { fetchAuditLogs, type AuditLogRecord } from '../api/auditLogs';

export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);

  useEffect(() => {
    void fetchAuditLogs().then(setLogs);
  }, []);

  return (
    <AppLayout>
      <main>
        <h1>Audit Logs</h1>
        <section>
          {logs.map((log) => (
            <article key={log._id}>
              <h2>{log.action}</h2>
              <p>
                {log.entityType} / {log.entityId}
              </p>
              <p>{log.timestamp}</p>
            </article>
          ))}
        </section>
      </main>
    </AppLayout>
  );
}
