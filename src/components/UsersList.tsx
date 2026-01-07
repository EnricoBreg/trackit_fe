import useUsers from "@/hooks/useUsers";
import { VStack } from "@chakra-ui/react";
import UserListItem from "./UserListItem";

const UsersList = () => {
  const { data } = useUsers();

  return (
    <VStack spaceY={4}>
      {data?.results.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </VStack>
  );
};

export default UsersList;
