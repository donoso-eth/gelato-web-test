import { useEffect, useState } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react"
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";

import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

const gaslessWalletConfig: GaslessWalletConfig = {
  apiKey: 'B8owAox7gHl8qcdBM1yPaEdjp6uqYTWecCvgSGrU4cY_'
};
const loginConfig: LoginConfig = {
  chain: {
    id: 80001,
    rpcUrl: 'https://polygon-mumbai.infura.io/v3/9a9c5c7e10084eaa98fd8b71b9cb5dd1',
  },
  openLogin: {
    redirectUrl: `${window.location.origin}`,
  },
};
const gaslessOnboarding = new GaslessOnboarding(
  loginConfig,
  gaslessWalletConfig
);

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [authProvider, setAuthProvider]: any = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const auth = await gaslessOnboarding.init();
      setAuthProvider(auth);
      // try {
      //   await gaslessOnboarding.logout();
      //   let web3authProvider = await gaslessOnboarding.login();
      //   console.log('TEST', web3authProvider)
      //   // const gaslessWallet: GaslessWalletInterface = gaslessOnboarding.getGaslessWallet();

      //   // const isDeployed = await gaslessWallet.isDeployed();
      //   // console.log('INIT', isDeployed);
      //   const user = await gaslessOnboarding.getUserInfo();
      //   console.log('INIT2', user);
      // } catch (error) {
      //   console.log(error);
      // }
      setIsReady(true);
    }

    init();
  }, []);

  console.log(authProvider)

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
            <Button
              onClick={async () => {
                await gaslessOnboarding.login();
              }}
              isDisabled={!isReady}
            >
              LOGIN
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
