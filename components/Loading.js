import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      bgColor="gray.900"
      minH="100vh"
    >
      <Text fontWeight="bold" color="white" fontSize="lg">
        App is Loading
      </Text>
      <Spinner
        mt={4}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
