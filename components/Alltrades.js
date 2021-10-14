import React from "react";
import Moment from "react-moment";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
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
} from "@chakra-ui/react";

const Alltrades = ({ trades }) => {
  const renderList = (trades) => {
    return (
      <>
        <Table colorScheme="blackAlpha" color="white" variant="striped" m={4}>
          <Thead>
            <Tr bgColor="black">
              <Th>amount</Th>
              <Th>price</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => (
              <Tr key={trade.orderId}>
                <Td>{trade.amount}</Td>
                <Td>{trade.price}</Td>
                <Td>
                  <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  };

  const renderChart = (trades) => {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trades}>
          <Line type="monotone" dataKey="price" stroke="#741cd7" />
          <CartesianGrid stroke="#000000" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
              const date = new Date(parseInt(dateStr) * 1000);
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }}
          />
          <YAxis dataKey="price" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box p={4} rounded="md" my={6} bgColor="gray.800" color="white">
      <Heading fontSize="2xl" as="h2">
        All trades
      </Heading>
      <Flex justifyContent="space-around" direction="column">
        <Flex>{renderChart(trades)}</Flex>
        <Flex>{renderList(trades)}</Flex>
      </Flex>
    </Box>
  );
};

export default Alltrades;
