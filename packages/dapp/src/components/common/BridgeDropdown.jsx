import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSettings } from 'contexts/SettingsContext';
import { DownArrowIcon } from 'icons/DownArrowIcon';
import { NetworkIcon } from 'icons/NetworkIcon';
import { networks } from 'lib/networks';
import React, { useCallback, useEffect, useState } from 'react';

const MATIC_BRIDGE_LINK = 'https://wallet.matic.network/bridge';
const MATCH_NETWORK = 'Matic/Polygon Network';
const BNB_BRIDGE_LINK = 'https://cbridge.celer.network/';
const BNB_NETWORK = 'BNB Network';
export const BridgeDropdown = ({ close = () => {} }) => {
  const { bridgeDirection, setBridgeDirection } = useSettings();
  const placement = useBreakpointValue({ base: 'top', md: 'top-end' });

  const setItem = useCallback(
    e => {
      setBridgeDirection(e.target.value, true);
      close();
    },
    [close, setBridgeDirection],
  );
  const [bridgeState, setBridgeState] = useState({
    visible: true,
    network: BNB_NETWORK,
    link: BNB_BRIDGE_LINK,
  });

  const networkOptions = Object.keys(networks);
  const isValidNetwork = networkOptions.indexOf(bridgeDirection) >= 0;

  const currentBridgeDirection = isValidNetwork
    ? bridgeDirection
    : networkOptions[0];

  useEffect(() => {
    if (!isValidNetwork) {
      setBridgeDirection(networkOptions[0], true);
    }
  }, [isValidNetwork, networkOptions, setBridgeDirection]);

  return (
    <>
      <Menu placement={placement}>
        <MenuButton
          as={Button}
          leftIcon={<NetworkIcon />}
          rightIcon={<DownArrowIcon boxSize="0.5rem" color="black" />}
          color="grey"
          bg="none"
          _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
          p={2}
        >
          <Text color="black" textTransform="uppercase" fontSize="sm">
            {networks[currentBridgeDirection].label}
          </Text>
        </MenuButton>
        <MenuList border="none" boxShadow="0 0.5rem 1rem #CADAEF" zIndex="3">
          <MenuItem
            value="eth-bsc"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="sm"
            justifyContent="center"
            onClick={() => {
              setBridgeState({
                visible: true,
                link: BNB_BRIDGE_LINK,
                network: BNB_NETWORK,
              });
            }}
          >
            ETH⥊BSC
          </MenuItem>
          <MenuItem
            key="eth-matic"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="sm"
            justifyContent="center"
            onClick={() => {
              setBridgeState({
                visible: true,
                link: MATIC_BRIDGE_LINK,
                network: MATCH_NETWORK,
              });
            }}
          >
            ETH⥊Matic
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal
        isOpen={bridgeState.visible}
        onClose={() => setBridgeState(v => ({ ...v, visible: false }))}
        closeOnEsc
        closeOnOverlayClick
        isCentered
      >
        <ModalOverlay background="modalBG">
          <ModalContent
            background="white"
            borderRadius="20px"
            w="448px"
            boxSizing="border-box"
          >
            <ModalHeader height="40px" fontSize={32} color="#1A1A76">
              Confirm
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text color="#7B8192" fontSize={18}>
                Confirm to enter the website for bridging assets provided by
                {bridgeState.network}{' '}
                <Link
                  href={bridgeState.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  color="#2b3bbc"
                >
                  {bridgeState.link}
                </Link>
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                bg="primary"
                color="white"
                isFullWidth
                borderRadius="20px"
                onClick={() => {
                  const newTab = window.open();
                  newTab.location = bridgeState.link;
                  setBridgeState(v => ({ ...v, visible: false }));
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
