import type { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { GoalModel } from '../models/Goal.model.js';
import { CheckInModel } from '../models/CheckIn.model.js';

async function buildReportRows() {
  const goals = await GoalModel.find().lean();
  const checkIns = await CheckInModel.find().lean();

  return goals.map((goal) => {
    const matchingCheckIns = checkIns.filter((checkIn) => String(checkIn.goalId) === String(goal._id));
    const latestCheckIn = matchingCheckIns[matchingCheckIns.length - 1];

    return {
      goalId: String(goal._id),
      title: goal.title,
      status: goal.status,
      weightage: goal.weightage,
      checkIns: matchingCheckIns.length,
      progress: latestCheckIn?.progress ?? 0,
    };
  });
}

export async function exportCsvReport(_req: Request, res: Response) {
  const rows = await buildReportRows();
  const headers = ['goalId', 'title', 'status', 'weightage', 'checkIns', 'progress'];
  const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers.join(','), ...rows.map((row) => headers.map((field) => escapeCell(row[field as keyof typeof row] as string | number)).join(','))].join('\n');

  res.header('Content-Type', 'text/csv');
  res.attachment('goal-report.csv');
  return res.send(csv);
}

export async function exportExcelReport(_req: Request, res: Response) {
  const rows = await buildReportRows();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('goal-report.xlsx');
  return res.send(buffer);
}

export async function plannedVsActualReport(_req: Request, res: Response) {
  const rows = await buildReportRows();
  return res.json({ data: rows });
}
