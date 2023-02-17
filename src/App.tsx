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
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"



export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [authProvider, setAuthProvider]: any = useState(undefined);
  const [gaslessOnboarding, setGelatoLogin] = useState<
  GaslessOnboarding | undefined
>();
const [web3AuthProvider, setWeb3AuthProvider] = useState<SafeEventEmitterProvider | null>(null);
  useEffect(() => {
    const init = async () => {
  
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

      await gaslessOnboarding.init();
      setGelatoLogin(gaslessOnboarding);
      const provider = gaslessOnboarding.getProvider();
      console.log(provider);
      if (provider) {
        setWeb3AuthProvider(provider);
        const user = await gaslessOnboarding.getUserInfo();
        console.log(user);
      }
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

  const login = async () => {
    if (!gaslessOnboarding) {
      return;
    }
    const web3authProvider = await gaslessOnboarding.login();
    setWeb3AuthProvider(web3authProvider);
  };

  const logout = async () => {
    if (!gaslessOnboarding) {
      return;
    }
    await gaslessOnboarding.logout();
    setWeb3AuthProvider(null);
  };


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
           { !web3AuthProvider && ( <Button
              onClick={login}
              isDisabled={!isReady}
            >
              LOGIN
            </Button>)}
            { web3AuthProvider && (<Button
              onClick={logout}
              isDisabled={!isReady}
            >
              LOG OUT
            </Button>)

            }
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
