import type User from "./User";

export const TaskStatuses = [
  "DA_ASSEGNARE",
  "ASSEGNATO",
  "IN_LAVORAZIONE",
  "COMPLETATA",
  "STAND_BY",
  "BLOCCATO",
  "ANNULLATO",
] as const;

export type TaskStatus = (typeof TaskStatuses)[number];

export const TaskPriorities = [
  "BASSA",
  "MEDIO_BASSA",
  "MEDIA",
  "MEDIO_ALTA",
  "ALTA",
] as const;
export type TaskPriority = (typeof TaskPriorities)[number];

export default interface Task {
  id: number | null;
  titolo: string;
  descrizione: string;
  stato: TaskStatus;
  priorita: TaskPriority;
  progresso: number;
  dataCreazione: string; // ISO date-time
  dataAssegnazione: string | null;
  dataInizioLavorazione: string | null;
  dataUltimaModifica: string;
  dataScadenza: string | null;
  dataChiusura: string | null;
  assegnatario: User;
  reporter: User;
  projectId: string; // UUID
}
