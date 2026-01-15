import type Project from "@/domain/entities/Project";
import { Badge, Box, Button, Card } from "@chakra-ui/react";

interface ProjectCardProps {
  project: Project;
  variant?: "subtle" | "outline" | "elevated";
}

const ProjectCard = ({ project, variant = "outline" }: ProjectCardProps) => {
  return (
    <Card.Root width="full" variant={variant}>
      <Card.Body gap="2">
        <Box>
          <Badge size="md" colorPalette="green">
            {project.stato}
          </Badge>
        </Box>
        <Card.Title mb="2">{project.nome}</Card.Title>
        <Card.Description>{project.descrizione}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">Dettagli</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectCard;
