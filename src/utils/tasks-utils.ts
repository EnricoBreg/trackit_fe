const getTaskPriorityColor = (priority: string) => {
  const priorityMap: Record<string, string> = {
    BASSA: "green",
    MEDIO_BASSA: "green",
    MEDIA: "yellow",
    MEDIO_ALTA: "orange",
    ALTA: "red",
  };

  return priorityMap[priority] || "gray";
};

const getTaskStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    DA_ASSEGNARE: "gray",
    ASSEGNATO: "blue",
    IN_LAVORAZIONE: "yellow",
    COMPLETATA: "green",
    STAND_BY: "orange",
    BLOCCATO: "red",
    ANNULLATO: "purple",
  };

  return statusMap[status] || "gray";
};

export { getTaskPriorityColor, getTaskStatusColor };
