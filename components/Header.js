import { Box, Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import Dropdown from "./Dropdown";

const Header = ({ user, tokens, contracts, selectToken }) => {
  console.log(user);
  return (
    <Flex
      px={4}
      borderBottomRadius="md"
      bgColor="gray.800"
      color="white"
      align="center"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Flex>
        <Dropdown
          items={tokens?.map((token) => ({
            label: token.ticker,
            value: token,
          }))}
          activeItem={{
            label: user?.selectedToken?.ticker,
            value: user?.selectedToken,
          }}
          onSelect={selectToken}
        />
      </Flex>
      <Flex display={["none", "flex"]}>
        <Heading fontSize="md" as="h1">
          Dex -{" "}
          <Box as="span" className="span">
            Contract Address
          </Box>
          {contracts?.dex.options.address}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
