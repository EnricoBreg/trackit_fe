export const GlobalPermission = {
  // Users
  USER_CREATE: {
    key: "USER_CREATE",
    description: "Creazione nuovo utente del sistema",
  },
  USER_EDIT: {
    key: "USER_EDIT",
    description: "Modificare informazioni profilo utente del sistema",
  },
  USER_DELETE: {
    key: "USER_DELETE",
    description: "Eliminazione utente del sistema",
  },
  USER_RESET_PASSWORD: {
    key: "USER_RESET_PASSWORD",
    description: "Possibilità di resettare la password",
  },
  USER_ENABLE_DISABLE: {
    key: "USER_ENABLE_DISABLE",
    description: "Possibilità di abilitare/disabilitare un utente",
  },
  USER_ROLE_ASSIGN: {
    key: "USER_ROLE_ASSIGN",
    description: "Possibilità di assegnare un ruolo ad un utente",
  },

  // Project
  PROJECT_CREATE: {
    key: "PROJECT_CREATE",
    description: "Possilità di creare un nuovo progetto",
  },
  PROJECT_EDIT: {
    key: "PROJECT_EDIT",
    description:
      "Possiblità di modificare le informazioni di un progetto esistente",
  },
  PROJECT_DELETE: {
    key: "PROJECT_DELETE",
    description: "Possibilità di eliminare definitivamente un progetto",
  },
} as const;

export type GlobalPermissionKey =
  (typeof GlobalPermission)[keyof typeof GlobalPermission]["key"];
export type GlobalPermissionName = keyof typeof GlobalPermission;
