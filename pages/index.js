import { Box, Container } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getWeb3, getContracts } from "../utils";
import Loading from "../components/Loading";
import Wallet from "../components/Wallet";
import Main from "../components/Main.js";

export default function Home() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
    };
    init();
  }, []);

  const isReady = () => {
    return (
      typeof web3 !== "undefined" &&
      typeof contracts !== "undefined" &&
      accounts.length > 0
    );
  };

  if (!isReady()) {
    return <Loading />;
  }
  return (
    <Box overflow="hidden" minH="100vh" bgColor="black">
      <Container maxW="container.2xl">
        <Main web3={web3} accounts={accounts} contracts={contracts} />
      </Container>
    </Box>
  );
}
