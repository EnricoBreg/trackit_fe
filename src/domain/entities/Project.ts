export default interface Project {
  id: string;
  nome: string;
  descrizione: string;
  stato: string;
  dataCreazione: Date;
  dataUltimaModifica: Date;
  dataChiusura: Date;
  tasksCount: number;
  //tasks: Task[]
  membersCount: number;
  //members: ProjectMember[]
}
