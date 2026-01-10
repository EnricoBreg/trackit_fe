import EntitySelect from "@/components/EntitySelect";
import UserSelect from "@/components/UserSelect";
import { Button } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";

export const Route = createFileRoute("/app/dashboard")({
  component: RouteComponent,
});

interface FormValues {
  userId: number | string;
  saluto: string;
}

function RouteComponent() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      userId: "14",
      saluto: "grande",
    },
  });

  const handleOnSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      Hello "/dashboard"!
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <UserSelect value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          name="saluto"
          control={control}
          render={({ field }) => (
            <EntitySelect
              caption="Selezione"
              items={["ciao", "sei", "grande"]}
              itemToString={(s) => s}
              itemToValue={(s) => s}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit" mt={4}>
          Salva
        </Button>
      </form>
    </div>
  );
}
