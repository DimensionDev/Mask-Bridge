import { Flex } from '@chakra-ui/react';
import { BridgeDropdown } from 'components/common/BridgeDropdown';
import { ConnectWeb3 } from 'components/common/ConnectWeb3';
import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import { TermsOfServiceModal } from 'components/modals/TermsOfServiceModal';
import { useSettings } from 'contexts/SettingsContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const { foreignChainId } = useBridgeDirection();
  const { account, providerChainId } = useWeb3Context();
  const { queryToken } = useSettings();
  const location = useLocation();

  const isQueryChainProvided =
    queryToken === null || providerChainId === queryToken.chainId;

  const valid = useMemo(() => {
    if (!account || !providerChainId || !isQueryChainProvided) {
      return false;
    }
    if (location.pathname === '/history') {
      return true;
    }
    return foreignChainId === providerChainId;
  }, [
    account,
    providerChainId,
    isQueryChainProvided,
    foreignChainId,
    location.pathname,
  ]);

  const bridgeSelectorVisible =
    account && (location.pathname === '/bridge' || !valid);

  return (
    <Flex
      p={0}
      m={0}
      overflowX="hidden"
      fontFamily="body"
      w="100%"
      minH="100vh"
      align="center"
      direction="column"
      position="relative"
    >
      <Header />
      <Flex
        flex={1}
        align="center"
        justify="center"
        direction="column"
        w="100%"
        h="100%"
        position="relative"
      >
        <Flex direction="column" align="center">
          {bridgeSelectorVisible ? (
            <Flex maxW="75rem" w="100%" justifyContent="flex-end" py="1rem">
              <BridgeDropdown />
            </Flex>
          ) : null}
          {valid ? children : <ConnectWeb3 />}
        </Flex>
      </Flex>
      <Footer />
      <TermsOfServiceModal />
    </Flex>
  );
};
