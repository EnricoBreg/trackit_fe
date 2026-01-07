import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import useAppTranslation from "@/hooks/useTranslation";
import { Button, Menu, Portal, Text } from "@chakra-ui/react";
import { BsSortUpAlt } from "react-icons/bs";

const UsersSortSelector = () => {
  const sortOrders = [
    { value: "nome", label: "Nome" },
    { value: "nome,desc", label: "Nome (disc)" },
    { value: "cognome", label: "Cognome" },
    { value: "cognome,desc", label: "Cognome (disc)" },
  ];

  const { t } = useAppTranslation();
  const setSortOrder = useUserQueryStore((s) => s.setSortOrder);
  const sortOrder = useUserQueryStore((s) => s.userQuery.sortOrder);
  const currentSortOrder = sortOrders.find((o) => o.value === sortOrder);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">
          <BsSortUpAlt />
          Ordinamento: {currentSortOrder?.label || "Nome"}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortOrders.map((order) => (
              <Menu.Item
                onClick={() => setSortOrder(order.value)}
                key={order.value}
                value={order.value}
              >
                <Text>{order.label}</Text>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default UsersSortSelector;
