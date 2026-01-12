import {
  Button,
  ButtonGroup,
  Steps,
  useSteps,
  type ButtonProps,
} from "@chakra-ui/react";
import React from "react";

import { FormProvider, useForm, type FieldValues } from "react-hook-form";

interface WizardStep {
  title?: string | undefined;
  component: React.ComponentType;
}

interface WizardProps<TFormValues extends FieldValues> {
  steps: WizardStep[];
  completedContentText?: string | undefined;
  prevButtonCaption?: React.ReactNode;
  prevButtonProps?: ButtonProps;
  nextButtonCaption?: React.ReactNode;
  nextButtonProps?: ButtonProps;
  onSubmit: (data: TFormValues) => void;
}

export function Wizard<TFormValues extends FieldValues>({
  steps,
  completedContentText,
  prevButtonCaption = "Prev",
  prevButtonProps,
  nextButtonCaption = "Next",
  nextButtonProps,
  onSubmit,
}: WizardProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    mode: "onTouched",
  });

  const stepsApi = useSteps({
    defaultStep: 0,
    count: steps.length,
  });

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
          <ButtonGroup size="sm" variant="outline">
            <Steps.PrevTrigger asChild>
              <Button {...prevButtonProps}>{prevButtonCaption}</Button>
            </Steps.PrevTrigger>
            {stepsApi.hasNextStep ? (
              <Steps.NextTrigger asChild>
                <Button {...nextButtonProps}>{nextButtonCaption}</Button>
              </Steps.NextTrigger>
            ) : (
              <Button type="submit" variant="solid">
                Submit
              </Button>
            )}
          </ButtonGroup>
        </Steps.RootProvider>
      </form>
    </FormProvider>
  );
}

export default Wizard;
