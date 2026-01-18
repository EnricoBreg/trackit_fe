import useUsers from "@/hooks/useUsers";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserListItem from "./UserListItem";

const UsersList = () => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useUsers();

  if (error) return <Text>{error.message}</Text>;

  const fetchedUsersCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedUsersCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      {isLoading && <Spinner />}

      <VStack spaceY={4}>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </React.Fragment>
        ))}
      </VStack>
    </InfiniteScroll>
  );
};

export default UsersList;
