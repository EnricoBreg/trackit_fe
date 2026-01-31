import type Role from "./Role";
import type User from "./User";

export default interface ProjectMember {
  user: User;
  role: Role;
  projectId: string;
}
