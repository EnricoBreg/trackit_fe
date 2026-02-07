import type { TaskPriority, TaskStatus } from "@/domain/entities/Task";

const getTaskPriorityColor = (priority: TaskPriority) => {
  const priorityMap: Record<TaskPriority, string> = {
    BASSA: "green",
    MEDIO_BASSA: "green",
    MEDIA: "yellow",
    MEDIO_ALTA: "orange",
    ALTA: "red",
  };

  return priorityMap[priority] || "gray";
};

const getTaskStatusColor = (status: TaskStatus) => {
  const statusMap: Record<TaskStatus, string> = {
    DA_ASSEGNARE: "gray",
    ASSEGNATO: "blue",
    IN_LAVORAZIONE: "yellow",
    COMPLETATA: "green",
    STAND_BY: "orange",
    BLOCCATO: "red",
    ANNULLATO: "red",
  };

  return statusMap[status] || "gray";
};

export { getTaskPriorityColor, getTaskStatusColor };
