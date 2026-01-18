import type { WizardStep } from "@/components/Wizard";
import type UserDetails from "@/domain/entities/User";
import type { AxiosError } from "axios";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

/* export type FetchResponse<T> = T[]; */

export interface FetchResponse<T> {
  results: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface LoginResponse {
  accessToken: string;
  details: UserDetails;
}

export interface BackendErrorResponse {
  error: string;
  message: string;
  timestap: number;
  errors?: Record<string, string>;
}

export function handleBackendErrors<TFormValues extends FieldValues>(
  error: AxiosError<BackendErrorResponse>,
  methods: UseFormReturn<TFormValues>,
  steps: WizardStep<TFormValues>[],
  stepsApi: { setStep: (i: number) => void },
) {
  const data = error.response?.data;
  if (!data) return;

  // Gestione errore globale
  methods.setError("root", {
    type: "server",
    message: data.message,
  });

  // Gestione errori di campo
  if (data.errors) {
    Object.entries(data.errors).forEach(([field, message]) => {
      methods.setError(field as Path<TFormValues>, {
        type: "server",
        message,
      });

      // torna allo step corretto
      const stepIndex = steps.findIndex((step) =>
        step.validationFields.includes(field as Path<TFormValues>),
      );

      if (stepIndex !== -1) {
        stepsApi.setStep(stepIndex);
      }
    });
  }
}
