export const RESULT_STATUSES = ["ready", "processing"] as const;
export type ResultStatus = (typeof RESULT_STATUSES)[number];

export type Sensitivity = "standard" | "sensitive" | "clinicianFirst";

export const RESULT_CATEGORIES = [
  "Blood test",
  "Screening",
  "Swab test",
  "Imaging",
  "Urine test",
] as const;
export type ResultCategory = (typeof RESULT_CATEGORIES)[number];

export const RESULT_SOURCES = [
  "GP surgery",
  "Hospital",
  "Screening programme",
  "Home test kit",
] as const;
export type ResultSource = (typeof RESULT_SOURCES)[number];

export interface TestResult {
  id: string;
  testName: string;
  category: ResultCategory;
  source: ResultSource;
  date: string;
  status: ResultStatus;
  sensitivity: Sensitivity;
  resultSummary: string;
  whatItMeans: string;
  whatToDoNext: string;
  requestedBy: string;
}
