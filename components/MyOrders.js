import React from "react";
import Moment from "react-moment";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Flex,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

const MyOrders = ({ orders }) => {
  const renderList = (orders, side, color) => {
    return (
      <>
        <Table
          maxW="600px"
          colorScheme="blackAlpha"
          color="white"
          variant="striped"
          m={4}
        >
          <Thead>
            <Tr>
              <Th colSpan={3} bgColor={color}>
                {side}
              </Th>
            </Tr>
            <Tr bgColor="black">
              <Th>amount/filled</Th>
              <Th>price</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>
                  {order.amount}/{order.filled}
                </Td>
                <Td>{order.price}</Td>
                <Td>
                  <Moment fromNow>{parseInt(order.date) * 1000}</Moment>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  };

  return (
    <Box p={4} rounded="md" my={6} bgColor="gray.800" color="white">
      <Heading fontSize="2xl" as="h2">
        My orders
      </Heading>
      <Flex
        justifyContent="space-around"
        direction={["column", "column", "row"]}
      >
        <Flex>{renderList(orders.buy, "Buy", "red.400")}</Flex>

        <Flex>{renderList(orders.sell, "Sell", "green.400")}</Flex>
      </Flex>
    </Box>
  );
};

export default MyOrders;
