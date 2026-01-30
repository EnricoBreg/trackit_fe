import type User from "./User";

export default interface Task {
  id: number | null;
  titolo: string;
  descrizione: string;
  stato: string;
  priorita: string;
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
