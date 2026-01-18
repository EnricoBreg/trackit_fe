import {
  Button,
  ButtonGroup,
  Steps,
  useSteps,
  type ButtonProps,
} from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Path,
  type Resolver,
} from "react-hook-form";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface WizardStep<TFormValues extends FieldValues> {
  title?: string | undefined;
  component: React.ComponentType;
  validationFields: Path<TFormValues>[];
}

interface WizardProps<TFormValues extends FieldValues> {
  steps: WizardStep<TFormValues>[];
  resolver: Resolver<TFormValues>;
  completedContentText?: string | undefined;
  prevButtonCaption?: React.ReactNode;
  prevButtonProps?: ButtonProps;
  nextButtonCaption?: React.ReactNode;
  nextButtonProps?: ButtonProps;
  submitButtonCaption?: React.ReactNode;
  submitButtonProps?: ButtonProps;
  buttonsAlignment?: "start" | "center" | "end";
  onSubmit: (data: TFormValues) => void;
}

export function Wizard<TFormValues extends FieldValues>({
  steps,
  resolver,
  completedContentText,
  prevButtonCaption = t("precedente"),
  prevButtonProps,
  nextButtonCaption = t("successivo"),
  nextButtonProps,
  submitButtonProps,
  submitButtonCaption = t("submit"),
  buttonsAlignment = "start",
  onSubmit,
}: WizardProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    mode: "onTouched",
    resolver,
  });

  const stepsApi = useSteps({
    defaultStep: 0,
    count: steps.length,
  });

  const handleNext = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // per prevenire un invio involontario del form prima
    // dell'effettivo invio con pulsante dedicato
    event.preventDefault();

    let currentStep = stepsApi.value;
    const fieldsToValidate = steps[currentStep].validationFields;

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) stepsApi.goToNextStep();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Steps.RootProvider value={stepsApi}>
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
          {steps.map((step, index) => {
            const StepComponent = step.component;
            return (
              <Steps.Content key={index} index={index}>
                <StepComponent />
              </Steps.Content>
            );
          })}

          <Steps.CompletedContent>
            {completedContentText}
          </Steps.CompletedContent>

          <ButtonGroup
            size="sm"
            variant="outline"
            justifyContent={buttonsAlignment}
          >
            <Steps.PrevTrigger asChild>
              <Button type="button" {...prevButtonProps}>
                <FaChevronLeft />
                {prevButtonCaption}
              </Button>
            </Steps.PrevTrigger>
            {stepsApi.hasNextStep ? (
              <Button
                type="button"
                onClick={(e) => handleNext(e)}
                {...nextButtonProps}
              >
                {nextButtonCaption}
                <FaChevronRight />
              </Button>
            ) : (
              <Button type="submit" variant="solid" {...submitButtonProps}>
                {submitButtonCaption}
                <FaCheck />
              </Button>
            )}
          </ButtonGroup>
        </Steps.RootProvider>
      </form>
    </FormProvider>
  );
}

export default Wizard;
