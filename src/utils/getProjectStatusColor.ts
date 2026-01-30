const getProjectStatusColor = (statusKey: string) => {
  const statusMap: Record<string, string> = {
    IDEA: "yellow",
    PIANIFICATO: "orange",
    IN_CORSO: "green",
    IN_PAUSA: "cyan",
    COMPLETATO: "blue",
    ANNULLATO: "red",
  };

  return statusMap[statusKey] || "gray";
};

export default getProjectStatusColor;
