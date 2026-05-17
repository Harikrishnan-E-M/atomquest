import { useEffect, useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { downloadCsvReport, downloadExcelReport, fetchPlannedVsActualReport, type ReportRow } from '../api/reports';

export function ReportsPage() {
  const [rows, setRows] = useState<ReportRow[]>([]);

  useEffect(() => {
    void fetchPlannedVsActualReport().then(setRows);
  }, []);

  return (
    <AppLayout>
      <main>
        <h1>Reports</h1>
        <div>
          <button type="button" onClick={downloadCsvReport}>
            Export CSV
          </button>
          <button type="button" onClick={downloadExcelReport}>
            Export Excel
          </button>
        </div>
        <section>
          {rows.map((row) => (
            <article key={row.goalId}>
              <h2>{row.title}</h2>
              <p>Status: {row.status}</p>
              <p>Weightage: {row.weightage}</p>
              <p>Check-ins: {row.checkIns}</p>
              <p>Progress: {row.progress}%</p>
            </article>
          ))}
        </section>
      </main>
    </AppLayout>
  );
}
