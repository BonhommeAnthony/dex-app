import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";

const TYPE = {
  LIMIT: "LIMIT",
  MARKET: "MARKET",
};

const SIDE = {
  BUY: 0,
  SELL: 1,
};

const NewOrder = ({ createMarketOrder, createLimitOrder }) => {
  const [order, setOrder] = useState({
    type: TYPE.LIMIT,
    side: SIDE.BUY,
    amount: "",
    price: "",
  });
  console.log("order", order);

  const onSubmit = (e) => {
    e.preventDefault();
    if (order.type === TYPE.MARKET) {
      createMarketOrder(order.amount, order.side);
    } else {
      createLimitOrder(order.amount, order.price, order.side);
    }
    setOrder((order) => ({ ...order, amount: "", price: "" }));
  };

  return (
    <Box p={4} rounded="md" my={6} bgColor="gray.800" maxW="md" color="white">
      <Stack spacing={4}>
        <Heading fontSize="xl" as="h2">
          New Order
        </Heading>
        <Divider />
        <chakra.form onSubmit={(e) => onSubmit(e)}>
          <Stack spacing={5}>
            <Flex align="center" justifyContent="space-between">
              <Text fontSize="lg">Type</Text>
              <Flex rounded="md" bgColor="black">
                <Button
                  variant="unstyled"
                  bgColor={order.type === TYPE.LIMIT ? "cyan.900" : ""}
                  onClick={() =>
                    setOrder((order) => ({ ...order, type: TYPE.LIMIT }))
                  }
                  w="100px"
                >
                  Limit
                </Button>
                <Button
                  w="100px"
                  bgColor={order.type === TYPE.MARKET ? "cyan.900" : ""}
                  onClick={() =>
                    setOrder((order) => ({ ...order, type: TYPE.MARKET }))
                  }
                  variant="unstyled"
                >
                  Market
                </Button>
              </Flex>
            </Flex>
            <Flex align="center" justifyContent="space-between">
              <Text fontSize="lg">Side</Text>
              <Flex rounded="md" bgColor="black">
                <Button
                  variant="unstyled"
                  bgColor={order.side === SIDE.BUY ? "cyan.900" : ""}
                  onClick={() =>
                    setOrder((order) => ({ ...order, side: SIDE.BUY }))
                  }
                  w="100px"
                >
                  Buy
                </Button>
                <Button
                  w="100px"
                  bgColor={order.side === SIDE.SELL ? "cyan.900" : ""}
                  onClick={() =>
                    setOrder((order) => ({ ...order, side: SIDE.SELL }))
                  }
                  variant="unstyled"
                >
                  Sell
                </Button>
              </Flex>
            </Flex>
            <Flex align="center" justifyContent="space-between">
              <Text fontSize="lg">Amount</Text>
              <Input
                value={order.amount}
                onChange={({ target: { value } }) =>
                  setOrder((order) => ({ ...order, amount: value }))
                }
                maxW="300px"
                fontWeight="extrabold"
                fontSize="xl"
                //   value={amount}
                type="number"
                bgColor="gray.900"
                border="none"
              />
            </Flex>
            {order.type === TYPE.MARKET ? null : (
              <Flex align="center" justifyContent="space-between">
                <Text fontSize="lg">Price</Text>
                <Input
                  value={order.price}
                  maxW="300px"
                  fontWeight="extrabold"
                  fontSize="xl"
                  onChange={({ target: { value } }) =>
                    setOrder((order) => ({ ...order, price: value }))
                  }
                  type="number"
                  bgColor="gray.900"
                  border="none"
                />
              </Flex>
            )}

            <Button type="submit" colorScheme="green">
              Submit Order
            </Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Box>
  );
};

export default NewOrder;
