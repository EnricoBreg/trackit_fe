import { TaskStatuses } from "@/domain/entities/Task";
import { t } from "i18next";
import z from "zod";

export const taskFormSchema = z
  .object({
    titolo: z.string().nonempty(t("task.validation.titoloNonNullo")),
    descrizione: z
      .string()
      .min(10, t("task.validation.descrizioneNonValida", { min: 10 })),
    stato: z.string().nonempty(t("task.validation.statoNonValido")),
    priorita: z.string().nonempty(t("task.validation.prioritaNonValida")),
    /* progresso: z
      .number(t("task.validation.valoreNonValido"))
      .min(0, t("task.validation.progressoMinimoNonValido"))
      .max(100, t("task.validation.progressoMassimoNonValido"), */
    progresso: z
      .string()
      .transform((val) => Number(val))
      .pipe(
        z
          .number(t("task.validation.valoreNonValido"))
          .min(0, t("task.validation.progressoMinimoNonValido"))
          .max(100, t("task.validation.progressoMassimoNonValido")),
      ),
    dataCreazione: z
      .date(t("task.validation.dataCreazioneNonValida"))
      .nonoptional(t("task.validation.dataCreazioneNonVuota")),
    dataAssegnazione: z
      .date(t("task.validation.dataAssegnazioneNonValida"))
      .optional(),
    dataInizioLavorazione: z
      .date(t("task.validation.dataInizioLavorazioneNonValida"))
      .optional(),
    dataScadenza: z.date(t("task.validation.dataScadenzaNonValida")),
    dataChiusura: z.date(t("task.validation.dataChiusuraNonValida")).optional(),
    assegnatario: z.string(t("task.validation.valoreNonValido")).optional(),
  })
  .superRefine(
    (
      {
        stato,
        dataAssegnazione,
        dataCreazione,
        dataInizioLavorazione,
        dataChiusura,
        dataScadenza,
        assegnatario,
      },
      ctx,
    ) => {
      // Stato della task diversa DA_ASSEGNARE e assegnatario non selezionato
      if (stato !== TaskStatuses[0] && !assegnatario) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.assegnatarioNonPuoEssereNullo"),
          path: ["assegnatario"],
        });
      }

      // dataScadenza deve essere dopo dataCreazione
      if (dataScadenza < dataCreazione) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataCreazione"),
            end: t("task.dataScadenza"),
          }),
          path: ["dataScadenza"],
        });
      }

      // dataAssegnazione inserita e dataCreazione successiva a dataAssegnazione
      if (dataAssegnazione && dataCreazione > dataAssegnazione) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataCreazione"),
            end: t("task.dataAssegnazione"),
          }),
          path: ["dataAssegnazione"],
        });
      }

      // dataInizioLavorazione inserita e dataCreazione successiva a dataInizioLavorazione
      if (dataInizioLavorazione && dataCreazione > dataInizioLavorazione) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataCreazione"),
            end: t("task.dataInizioLavorazione"),
          }),
          path: ["dataInizioLavorazione"],
        });
      }

      // dataChiusura inserita e dataCreazione successiva a dataChiusura
      if (dataChiusura && dataCreazione > dataChiusura) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataCreazione"),
            end: t("task.dataChiusura"),
          }),
          path: ["dataChiusura"],
        });
      }

      // dataInizioLavorazione, dataAssegnazione inserite e dataAssegnazione successiva a dataInizioLavorazione
      if (
        dataInizioLavorazione &&
        dataAssegnazione &&
        dataAssegnazione > dataInizioLavorazione
      ) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataAssegnazione"),
            end: t("task.dataInizioLavorazione"),
          }),
          path: ["dataInizioLavorazione"],
        });
      }

      // dataInizioLavorazione, dataChiusura inserite e dataInizioLavorazione successiva a dataChiusura
      if (
        dataInizioLavorazione &&
        dataChiusura &&
        dataInizioLavorazione > dataChiusura
      ) {
        ctx.addIssue({
          code: "custom",
          message: t("task.validation.intervalloTemporaleNonValido", {
            start: t("task.dataInizioLavorazione"),
            end: t("task.dataChiusura"),
          }),
          path: ["dataInizioLavorazione"],
        });
      }
    },
  );

export type TaskFormValues = z.output<typeof taskFormSchema>;
