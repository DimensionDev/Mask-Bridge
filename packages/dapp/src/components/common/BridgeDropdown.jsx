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
export const BridgeDropdown = ({ close = () => {} }) => {
  const { bridgeDirection, setBridgeDirection } = useSettings();
  const placement = useBreakpointValue({ base: 'top', md: 'top-end' });
  const [modalVisible, setModalVisible] = useState(false);

  const setItem = useCallback(
    e => {
      setBridgeDirection(e.target.value, true);
      close();
    },
    [close, setBridgeDirection],
  );

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
          {Object.entries(networks).map(([key, { label }]) => (
            <MenuItem
              value={key}
              onClick={setItem}
              key={key}
              textTransform="uppercase"
              fontWeight="700"
              fontSize="sm"
              justifyContent="center"
            >
              {label}
            </MenuItem>
          ))}
          <MenuItem
            key="eth-matic"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="sm"
            justifyContent="center"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            ETH⥊Matic
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
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
                Matic/Polygon Network{' '}
                <Link
                  href={MATIC_BRIDGE_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                  color="#2b3bbc"
                >
                  {MATIC_BRIDGE_LINK}
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
                  newTab.location = MATIC_BRIDGE_LINK;
                  setModalVisible(false);
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
