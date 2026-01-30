import type User from "@/domain/entities/User";

const getUserDisplayName = (user: User) => {
  const nome = user.nome;
  const cognome = user.cognome;
  const username = user.username;
  let displayName = "";

  if (nome && cognome) {
    displayName = nome + " " + cognome;
  } else {
    displayName = username;
  }

  return displayName;
};

export { getUserDisplayName };
