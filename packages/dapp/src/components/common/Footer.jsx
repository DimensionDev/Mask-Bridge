import { Box, Flex, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { GithubIcon } from 'icons/GithubIcon';
import { MediumIcon } from 'icons/MediumIcon';
import { TelegramIcon } from 'icons/TelegramIcon';
import { TwitterIcon } from 'icons/TwitterIcon';
import React from 'react';

export const Footer = () => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  const year = new Date().getFullYear();
  return (
    <>
      <Flex
        position="relative"
        justify={{ base: 'center', sm: 'space-between' }}
        align="center"
        maxW="75rem"
        px={8}
        w="100%"
        color="grey"
      >
        {!smallScreen && (
          <a href="https://mask.io" rel="noreferrer noopener" target="_blank">
            <Text color="darkblue">&copy; {year} Mask Network</Text>
          </a>
        )}
        <HStack spacing={4}>
          <Box _hover={{ color: 'blue.500' }} transition="0.25s">
            <a
              href="https://masknetwork.medium.com/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <MediumIcon />
            </a>
          </Box>
          <Box _hover={{ color: 'blue.500' }} transition="0.25s">
            <a
              href="https://t.me/maskbook_group"
              rel="noreferrer noopener"
              target="_blank"
            >
              <TelegramIcon />
            </a>
          </Box>
          <Box _hover={{ color: 'blue.500' }} transition="0.25s">
            <a
              href="https://github.com/DimensionDev/Maskbook"
              rel="noreferrer noopener"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </Box>
          <Box _hover={{ color: 'blue.500' }} transition="0.25s">
            <a
              href="https://twitter.com/realmaskbook"
              rel="noreferrer noopener"
              target="_blank"
            >
              <TwitterIcon />
            </a>
          </Box>
        </HStack>
      </Flex>
      <Flex w="100%" maxW="75rem" px={8} h={10} pt={1} pb={15}>
        <Text
          color="#7A83B2"
          fontSize="sm"
          w="100%"
          textAlign={smallScreen ? 'center' : 'inherit'}
        >
          Forked from{' '}
          <a href="https://omni.xdaichain.com/" rel="noopener noreferrer">
            OmniBridge
          </a>
        </Text>
      </Flex>
    </>
  );
};
