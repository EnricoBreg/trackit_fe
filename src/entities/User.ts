export default interface User {
  id: number;
  nome: string;
  cognome: string;
  nominativo: string;
  username: string;
  email: string;
}

export default interface UserDetails {
  user: User;
  globalPermissions: string[];
  projectPermissions: string[];
}
