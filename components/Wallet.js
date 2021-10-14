import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";

const DIRECTION = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

const Wallet = ({ deposit, withdraw, user }) => {
  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    if (direction === DIRECTION.DEPOSIT) {
      deposit(amount);
    } else {
      withdraw(amount);
    }
    setAmount(0);
  };

  return (
    <Box p={4} rounded="md" my={6} bgColor="gray.800" maxW="md" color="white">
      <Stack spacing={4}>
        <Heading fontSize="xl" as="h2">
          Wallet
        </Heading>
        <Divider />
        <Heading fontSize="xl" as="h3">
          Token balance for {user?.selectedToken.ticker}
        </Heading>
        <Divider />
        <Flex align="center" justifyContent="space-between">
          <Text fontSize="lg">Wallet</Text>
          <Input
            fontSize="xl"
            fontWeight="extrabold"
            value={user.balances.tokenWallet}
            maxW="300px"
            bgColor="black"
            border="none"
            disabled
          />
        </Flex>
        <Flex align="center" justifyContent="space-between">
          <Text fontSize="lg">Dex</Text>
          <Input
            fontSize="xl"
            fontWeight="extrabold"
            value={user.balances.tokenDex}
            maxW="300px"
            bgColor="black"
            border="none"
            disabled
          />
        </Flex>
        <Divider />
        <Heading fontSize="xl" as="h3">
          Transfer {user?.selectedToken.ticker}
        </Heading>
        <chakra.form onSubmit={(e) => onSubmit(e)}>
          <Stack spacing={4}>
            <Flex align="center" justifyContent="space-between">
              <Text fontSize="lg">Dex</Text>
              <Flex rounded="md" bgColor="black">
                <Button
                  variant="unstyled"
                  bgColor={direction === DIRECTION.DEPOSIT ? "red.400" : ""}
                  onClick={() => setDirection(DIRECTION.DEPOSIT)}
                  w="100px"
                >
                  Deposit
                </Button>
                <Button
                  w="100px"
                  bgColor={direction === DIRECTION.DEPOSIT ? "" : "green.400"}
                  onClick={() => setDirection(DIRECTION.WITHDRAW)}
                  variant="unstyled"
                >
                  Withdraw
                </Button>
              </Flex>
            </Flex>
            <Flex align="center" justifyContent="space-between">
              <Text fontSize="lg">Amount</Text>
              <InputGroup maxW="300px" fontWeight="extrabold" fontSize="xl">
                <Input
                  value={amount}
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  bgColor="gray.900"
                  border="none"
                />
                <InputRightAddon
                  border="none"
                  bgColor="black"
                  children={user.selectedToken.ticker}
                />
              </InputGroup>
            </Flex>
            <Button
              type="submit"
              bgColor={
                direction === DIRECTION.DEPOSIT ? "red.400" : "green.400"
              }
            >
              Submit
            </Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Box>
  );
};

export default Wallet;
