import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId_/edit")({
  component: RouteComponent,
  loader: ({ params, context }) => {
    console.log("Params.userid", params);
    console.log("Siamo in userid/edit");
    console.log(context);
  },
});

function RouteComponent() {
  return <div>Hello "/app/users/$userId/edit"!</div>;
}
