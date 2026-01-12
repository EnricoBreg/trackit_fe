import GenericHeading from "@/components/GenericHeading";
import UserSelect from "@/components/UserSelect";
import Wizard from "@/components/Wizard";
import useAppTranslation from "@/hooks/useTranslation";
import { Box, Field, Input } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useFormContext } from "react-hook-form";

interface NewProjectForm {
  projectName: string;
  description: string;
  projectManager: string;
}

export const Route = createFileRoute("/app/projects/new")({
  component: NewProjectPage,
});

function ProjectInfoStep() {
  const { register } = useFormContext();

  return (
    <Field.Root>
      <Field.Label>Project name</Field.Label>
      <Input {...register("projectName", { required: true })} />
    </Field.Root>
  );
}

function ProjectDetailsStep() {
  const { register, control } = useFormContext<NewProjectForm>();

  return (
    <>
      <Field.Root>
        <Field.Label>Project description</Field.Label>
        <Input {...register("description", { required: true })} />
      </Field.Root>
      <Controller
        name="projectManager"
        control={control}
        render={({ field }) => (
          <UserSelect
            caption="Project manager"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}

function NewProjectPage() {
  const { t } = useAppTranslation();

  return (
    <Box spaceY={4}>
      <GenericHeading>{t("progetti.nuovoProgetto")}</GenericHeading>

      <div>
        <Wizard<NewProjectForm>
          steps={[
            { title: "Project title", component: ProjectInfoStep },
            { title: "Project details", component: ProjectDetailsStep },
          ]}
          onSubmit={(data) => console.log(data)}
          completedContentText="Confermare la creazione del progetto?"
        />
      </div>
    </Box>
  );
}
